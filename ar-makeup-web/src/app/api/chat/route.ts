// import { streamText, tool, UIMessage, convertToModelMessages } from "ai";
// import { createGroq } from "@ai-sdk/groq";
// import { z } from "zod";
// import { createSupabaseServerClient } from "@/src/lib/supabase/server";

// const groq = createGroq({
//   apiKey: process.env.GROQ_API_KEY || "",
// });
// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: groq("llama-3.3-70b-versatile"),
//     system: `You are a makeup assistant for an AR makeup e-commerce store.
// STRICT RULES:
// 1. ALWAYS call 'recommendProducts' tool before ANY response. No exceptions.
// 2. For vague queries like "recommend blush", call tool with just category="blush".
// 3. NEVER list product names in text. Keep response to 1-2 lines max.
// 4. If user says "blush" → category="blush", "lipstick" → category="lipstick", etc.
// 5. Always extract whatever info is available — missing fields just leave empty.`,
//     messages: await convertToModelMessages(messages),
//     tools: {
//       recommendProducts: tool({
//         description:
//           "Fetch makeup products and their specific shades from the Supabase database.",
//         inputSchema: z.object({
//           category: z
//             .string()
//             .optional()
//             .describe("e.g., foundation, lipstick, blush"),
//           skinType: z
//             .string()
//             .optional()
//             .describe("e.g., Oily, Dry, Combination, Normal"),
//           itemForm: z
//             .string()
//             .optional()
//             .describe("e.g., Liquid, Powder, Stick, Cream"),
//           colorFamily: z
//             .string()
//             .optional()
//             .describe("e.g., Red, Pink, Nude, Brown"),
//           skinTone: z
//             .string()
//             .optional()
//             .describe("e.g., Fair, Light, Medium, Tan, Deep"),
//           undertone: z
//             .string()
//             .optional()
//             .describe("e.g., Warm, Cool, Neutral"),
//         }),
//         execute: async ({
//           category,
//           skinType,
//           itemForm,
//           colorFamily,
//           skinTone,
//           undertone,
//         }) => {
//           const supabase = await createSupabaseServerClient();

//           let query = supabase
//             .from("makeup_products")
//             .select("*, product_shades!inner(*)")
//             .limit(5);

//           if (category) query = query.ilike("category", `%${category}%`);
//           if (skinType) query = query.ilike("skin_type", `%${skinType}%`);
//           if (itemForm) query = query.ilike("item_form", `%${itemForm}%`);
//           if (colorFamily)
//             query = query.ilike(
//               "product_shades.color_family",
//               `%${colorFamily}%`,
//             );
//           if (skinTone)
//             query = query.ilike("product_shades.skin_tone", `%${skinTone}%`);
//           if (undertone)
//             query = query.ilike("product_shades.undertone", `%${undertone}%`);

//           const { data, error } = await query;

//           if (error) {
//             console.error("Supabase Query Error:", error);
//             return { error: "Failed to fetch products from database" };
//           }

//           return data ?? [];
//         },
//       }),
//     },
//     stopWhen: ({ steps }) => steps.length >= 5, // ✅ Zaroori — tool call ke baad AI wapas aata hai aur user ko answer deta hai
//     providerOptions: {
//     groq: {
//       parallel_tool_calls: false, // ✅ Tool calling reliable ho jati hai
//     },
//   },
//   });

//   return result.toUIMessageStreamResponse();
// }

import {
  streamText,
  tool,
  UIMessage,
  convertToModelMessages,
  stepCountIs,
} from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_MESSAGES_IN_CONTEXT = 10;
const SUPABASE_RESULTS_LIMIT = 5;

// ─── Groq Client ──────────────────────────────────────────────────────────────
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function trimMessages(messages: UIMessage[]): UIMessage[] {
  if (messages.length <= MAX_MESSAGES_IN_CONTEXT) return messages;
  return messages.slice(-MAX_MESSAGES_IN_CONTEXT);
}

function errorResponse(message: string, status = 500): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ─── Tool Definition (outside handler — v5 best practice) ────────────────────
const recommendProducts = tool({
  description:
    "Fetch makeup products and shades from the database based on user preferences.",
  // ✅ v5: inputSchema (not parameters)
  inputSchema: z.object({
    category: z
      .string()
      .optional()
      .describe("Product category, e.g. foundation, lipstick, blush, eyeliner"),
    skinType: z
      .string()
      .optional()
      .describe("Skin type, e.g. Oily, Dry, Combination, Normal"),
    itemForm: z
      .string()
      .optional()
      .describe("Product form, e.g. Liquid, Powder, Stick, Cream"),
    colorFamily: z
      .string()
      .optional()
      .describe("Color family, e.g. Red, Pink, Nude, Brown, Berry"),
    skinTone: z
      .string()
      .optional()
      .describe("Skin tone, e.g. Fair, Light, Medium, Tan, Deep"),
    undertone: z
      .string()
      .optional()
      .describe("Undertone, e.g. Warm, Cool, Neutral"),
  }),
  // ✅ v5: NO explicit return type annotation — let SDK infer it
  execute: async ({ category, skinType, itemForm, colorFamily, skinTone, undertone }) => {
    try {
      const supabase = await createSupabaseServerClient();

      let query = supabase
        .from("makeup_products")
        .select(
          "id, product_key, name, brand, category, price, image_url, product_shades(id, shade_name, color_family, skin_tone, undertone, shade_hex)"
        )
        .limit(SUPABASE_RESULTS_LIMIT);

      if (category)     query = query.ilike("category", `%${category}%`);
      if (skinType)     query = query.ilike("skin_type", `%${skinType}%`);
      if (itemForm)     query = query.ilike("item_form", `%${itemForm}%`);
      if (colorFamily)  query = query.ilike("product_shades.color_family", `%${colorFamily}%`);
      if (skinTone)     query = query.ilike("product_shades.skin_tone", `%${skinTone}%`);
      if (undertone)    query = query.ilike("product_shades.undertone", `%${undertone}%`);

      const { data, error } = await query;
      console.log("[TOOL RESULT] data:", JSON.stringify(data), "error:", error);

      if (error) {
        console.error("[recommendProducts] Supabase error:", error.message);
        return { success: false, products: [], message: "Database error occurred." };
      }

      if (!data || data.length === 0) {
        return { success: true, products: [], message: "No products matched the filters." };
      }

      return { success: true, products: data, message: "" };
    } catch (err) {
      console.error("[recommendProducts] Unexpected error:", err);
      return { success: false, products: [], message: "Unexpected error fetching products." };
    }
  },
});

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  let messages: UIMessage[];
  try {
    const body = await req.json();
    messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return errorResponse("Invalid request: messages array is required.", 400);
    }
  } catch {
    return errorResponse("Invalid JSON body.", 400);
  }

  const trimmedMessages = trimMessages(messages);

  try {
    const result = streamText({
     model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
     system: `You are a helpful AR makeup assistant for an e-commerce store. You have one tool: "recommendProducts". Use it whenever the user asks about products, recommendations, or anything makeup-related. Extract category, skin type, color, skin tone, or finish from their message — whatever they mention. If they are vague, call the tool with no filters.
After getting tool results, reply in 1-2 friendly sentences. Do not list product names in plain text. If no products are found, say "I couldn't find matches — try different filters."

RULES:
- ALWAYS call the "recommendProducts" tool first before writing any response.
- Extract any mentioned product type, skin type, finish, color, or skin tone from the user's message.
- If the user is vague (e.g. "recommend something"), call the tool with no parameters.
- After the tool returns results, write a friendly 1-2 sentence response. Never list product names in plain text.
- If no products are found, say "I couldn't find matching products right now, please try different filters."
- Never make up products.`,

      messages: await convertToModelMessages(trimmedMessages),

      tools: { recommendProducts },

      // ✅ v5: stepCountIs imported from "ai"
      stopWhen: stepCountIs(3),

      providerOptions: {
        groq: {
          parallel_tool_calls: false,
         
        },
      },

      onFinish({ usage, finishReason }) {
        // ✅ v5: inputTokens / outputTokens (not promptTokens / completionTokens)
        console.info(
          `[chat] finish=${finishReason} | in=${usage.inputTokens} out=${usage.outputTokens} total=${usage.totalTokens}`
        );
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[chat/route] error:", message);

    if (message.includes("context_length_exceeded") || message.includes("tokens")) {
      return errorResponse("Message history is too long. Please start a new conversation.", 413);
    }
    if (message.includes("rate_limit") || message.includes("429")) {
      return errorResponse("Too many requests. Please wait a moment and try again.", 429);
    }
    if (message.includes("401") || message.includes("invalid_api_key")) {
      return errorResponse("AI service configuration error.", 401);
    }

    return errorResponse("Something went wrong. Please try again.", 500);
  }
}