const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID || process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_ACCESS_TOKEN = process.env.EMAILJS_ACCESS_TOKEN || process.env.EMAILJS_PRIVATE_KEY;

function safeString(value: unknown) {
  return typeof value === 'string' ? value : String(value ?? '');
}

function renderOrderItems(items: any[] = []) {
  return items
    .filter(Boolean)
    .map((item) => {
      const name = safeString(item.name || item.product_name || 'Product');
      const shade = safeString(item.shade_name);
      const quantity = Number(item.quantity || item.units || 0);
      const unitPrice = Number(item.price ?? item.unit_price ?? 0);
      const lineTotal = Number(item.line_total ?? unitPrice * quantity);

      return `
        <tr style="border-bottom:1px solid #f5eaed;">
          <td style="padding:10px 4px;font-size:13px;color:#333;">
            ${name}${shade ? `<br><span style="font-size:11px;color:#999;">${shade}</span>` : ''}
          </td>
          <td style="padding:10px 4px;font-size:13px;color:#333;text-align:center;">
            ${quantity}
          </td>
          <td style="padding:10px 4px;font-size:13px;color:#333;text-align:right;">
            $${lineTotal.toFixed(2)}
          </td>
        </tr>
      `;
    })
    .join('');
}

function buildOrderItems(items: any[] = []) {
  return items
    .filter(Boolean)
    .map((item) => {
      const name = safeString(item.name || item.product_name || 'Product');
      const quantity = Number(item.quantity || item.units || 0);
      const unitPrice = Number(item.price ?? item.unit_price ?? 0);
      const lineTotal = Number(item.line_total ?? unitPrice * quantity);

      return {
        name,
        units: quantity,
        price: unitPrice.toFixed(2),
        unit_price: unitPrice.toFixed(2),
        line_total: lineTotal.toFixed(2),
        shade: safeString(item.shade_name),
      };
    });
}

export async function POST(req: Request) {
  try {
    const { orderDetails, userEmail, userName } = await req.json();

    if (!userEmail) {
      return Response.json({ error: 'No email provided' }, { status: 400 });
    }

    const isCOD = orderDetails.payment_method === 'cash_on_delivery';
    const shortId = orderDetails.order_id?.slice(0, 8) || 'N/A';

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
      console.error('[send-order-email] Missing EmailJS configuration');
      return Response.json(
        { error: 'EmailJS configuration is missing on the server.' },
        { status: 500 },
      );
    }

    const templateParams = {
      email: userEmail,
      to_email: userEmail,
      to_name: userName || 'Valued Customer',
      order_id: shortId,
      order_ref: shortId,
      orders: buildOrderItems(orderDetails.items || []),
      order_items_html: renderOrderItems(orderDetails.items || []),
      cost: {
        shipping: Number(orderDetails.shipping_fee || 0).toFixed(2),
        tax: Number(orderDetails.tax || 0).toFixed(2),
        total: Number(orderDetails.total || 0).toFixed(2),
      },
      order_total: Number(orderDetails.total || 0).toFixed(2),
      payment_method: isCOD ? 'Cash on Delivery' : 'Online Payment',
      order_subject: `${isCOD ? 'Order Placed' : 'Payment Confirmed'} — #${shortId}`,
      reply_to: userEmail,
    };

    const body: any = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_USER_ID,
      template_params: templateParams,
    };

    if (EMAILJS_ACCESS_TOKEN) {
      body.accessToken = EMAILJS_ACCESS_TOKEN;
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown EmailJS error');
      console.error('[send-order-email] EmailJS error:', response.status, errorText);
      return Response.json(
        { error: 'Failed to send email through EmailJS.', details: errorText },
        { status: 500 },
      );
    }

    return Response.json({ success: true });

  } catch (err) {
    console.error('[send-order-email] Error:', err);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}