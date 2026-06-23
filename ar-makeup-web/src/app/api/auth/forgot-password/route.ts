import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

    // Store reset token in password_resets table
    const { error: insertError } = await supabase
      .from("password_resets")
      .insert({
        email,
        token: resetToken,
        expires_at: expiresAt,
      });

    if (insertError) {
      console.error("[forgot-password] Error storing token:", insertError);
      return NextResponse.json(
        {
          success: true,
          message:
            "If an account exists with this email, a reset link has been sent.",
        },
        { status: 200 },
      );
    }

    // Send email via Resend
    try {
      const emailResult = await resend.emails.send({
        // forgot-password/route.ts mein

        from: " Lumeire Makeup <onboarding@resend.dev>", // ✅ yeh use karo,
        to: email,
        subject: "Reset Your Password - AR Makeup",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #C06C84 0%, #D4869F 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h2 style="color: white; margin: 0; font-size: 24px;">Password Reset Request</h2>
            </div>
            
            <div style="padding: 40px 30px; background-color: #FAFAF9; border: 1px solid #E8E8E8; border-top: none;">
              <p style="color: #4A4A4A; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi there! We received a request to reset your password. Click the button below to create a new password.
              </p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${origin}/auth/reset-password?token=${resetToken}" style="background-color: #C06C84; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px; transition: background-color 0.3s;">
                  Reset Password
                </a>
              </div>
              
              <p style="color: #666; font-size: 13px; text-align: center; margin: 30px 0 0 0;">
                Or copy this link:<br>
                <span style="color: #999; word-break: break-all; font-size: 12px;">${origin}/auth/reset-password?token=${resetToken}</span>
              </p>
              
              <div style="background-color: #F4F4F4; padding: 15px; border-radius: 6px; margin-top: 30px;">
                <p style="color: #666; font-size: 13px; margin: 0;">
                  <strong>⏰ This link expires in 24 hours</strong><br>
                  For security reasons, this password reset link will only work for 24 hours.
                </p>
              </div>
              
              <p style="color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #E8E8E8; padding-top: 20px;">
                If you didn't request a password reset, you can safely ignore this email. Your account is secure.
              </p>
            </div>
            
            <div style="background-color: #F4EEE8; padding: 20px; text-align: center; font-size: 12px; color: #999; border-radius: 0 0 8px 8px;">
              <p style="margin: 0;">© 2026 AR Makeup. All rights reserved.</p>
              <p style="margin: 5px 0 0 0; font-size: 11px;">This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        `,
      });
      if (emailResult.error) {
      console.error("[forgot-password] Resend error:", emailResult.error);
      // ab pata chalega kya error hai
    }
      console.log("[forgot-password] Email sent successfully to:", email);
    } catch (emailError) {
      console.error("[forgot-password] Resend error:", emailError);
    }
    

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account exists with this email, a reset link has been sent.",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("[forgot-password API] Error:", err);
    return NextResponse.json(
      { error: "Failed to process reset request" },
      { status: 500 },
    );
  }
}
