/**
 * Unit IV: Email Integration using Nodemailer
 * Configures SMTP transport, creates styled Indian-themed HTML templates,
 * and handles order confirmations and customer inquiry emails.
 */
import nodemailer from 'nodemailer';

let transporterPromise = null;

async function getTransporter() {
  if (transporterPromise) return transporterPromise;

  transporterPromise = (async () => {
    // If explicit SMTP credentials are provided in .env
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: Number(process.env.EMAIL_PORT) === 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    }

    // Otherwise, auto-create a real Ethereal test account for instant testing
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log(`[EMAIL] 📧 Generated Ethereal Test Account: ${testAccount.user}`);
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    } catch (err) {
      console.warn('[EMAIL] ⚠️ Ethereal test account unavailable, using fallback mock transport:', err.message);
      // Fallback pseudo transport
      return {
        sendMail: async (mailOptions) => {
          console.log(`[EMAIL-MOCK] 📨 Simulated Email to: ${mailOptions.to} | Subject: ${mailOptions.subject}`);
          return { messageId: `mock-${Date.now()}` };
        }
      };
    }
  })();

  return transporterPromise;
}

/**
 * Send order confirmation email with Indian rupee invoice
 */
export async function sendOrderConfirmationEmail(order) {
  try {
    const transporter = await getTransporter();
    const fromAddress = process.env.EMAIL_FROM || '"BookVilla Bookstore" <orders@bookvilla.in>';

    const itemsHtml = order.items
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #EAE0D5;">
          <td style="padding: 10px; font-family: Georgia, serif; color: #1E3A2F;">
            <strong>${item.title}</strong><br/>
            <span style="font-size: 12px; color: #6F6A61;">by ${item.author}</span>
          </td>
          <td style="padding: 10px; text-align: center; color: #3A352F;">${item.quantity}</td>
          <td style="padding: 10px; text-align: right; color: #8F2D19; font-weight: bold;">₹${item.price}</td>
          <td style="padding: 10px; text-align: right; color: #1E3A2F; font-weight: bold;">₹${item.price * item.quantity}</td>
        </tr>
      `
      )
      .join('');

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: auto; background: #FDFBF7; border: 1px solid #EAE0D5; border-radius: 8px; overflow: hidden;">
        <div style="background: #1E3A2F; padding: 24px; text-align: center; color: #F7E7CE;">
          <h1 style="margin: 0; font-family: Georgia, serif; letter-spacing: 1px;">BookVilla</h1>
          <p style="margin: 4px 0 0; font-size: 13px; color: #C5A059;">Sanctuary of Indian Literature &amp; Rare Folios</p>
        </div>

        <div style="padding: 24px;">
          <h2 style="font-family: Georgia, serif; color: #1E3A2F; margin-top: 0;">Namaste, ${order.customerName}!</h2>
          <p style="color: #3A352F; line-height: 1.6;">
            Thank you for ordering with BookVilla. Your folio has been registered in our archives and is being lovingly hand-wrapped at our fulfillment center.
          </p>

          <div style="background: #F4EBE1; padding: 14px 18px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #8F2D19;">
            <p style="margin: 0; color: #1E3A2F; font-weight: bold;">Order Reference: ${order.orderNumber}</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #6F6A61;">Tracking: <strong>${order.trackingNumber || 'BLUEDART-EXP-IN'}</strong> (${order.shippingMethod})</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #6F6A61;">Estimated Dispatch: Within 24-48 Hours</p>
          </div>

          <h3 style="font-family: Georgia, serif; color: #1E3A2F; border-bottom: 2px solid #C5A059; padding-bottom: 6px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <thead>
              <tr style="background: #ECE3D4; color: #1E3A2F; text-align: left;">
                <th style="padding: 8px 10px;">Item</th>
                <th style="padding: 8px 10px; text-align: center;">Qty</th>
                <th style="padding: 8px 10px; text-align: right;">Price</th>
                <th style="padding: 8px 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="text-align: right; margin-bottom: 24px;">
            <p style="margin: 4px 0; color: #6F6A61;">Subtotal: <strong>₹${order.subtotal}</strong></p>
            <p style="margin: 4px 0; color: #6F6A61;">GST (5%): <strong>₹${order.tax}</strong></p>
            <p style="margin: 4px 0; color: #6F6A61;">Shipping: <strong>${order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost}`}</strong></p>
            ${order.discount > 0 ? `<p style="margin: 4px 0; color: #1E824C;">Discount: <strong>-₹${order.discount}</strong></p>` : ''}
            <h3 style="margin: 8px 0 0; color: #8F2D19; font-size: 20px;">Total Paid: ₹${order.totalAmount}</h3>
          </div>

          <div style="background: #FFFFFF; border: 1px solid #EAE0D5; padding: 14px 18px; border-radius: 6px;">
            <h4 style="margin: 0 0 6px; font-family: Georgia, serif; color: #1E3A2F;">Delivery Address (India):</h4>
            <p style="margin: 0; color: #3A352F; font-size: 14px; line-height: 1.5;">
              ${order.shippingAddress.fullName}<br/>
              ${order.shippingAddress.address}<br/>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}<br/>
              Phone: ${order.customerPhone}
            </p>
          </div>
        </div>

        <div style="background: #ECE3D4; padding: 16px; text-align: center; font-size: 12px; color: #6F6A61;">
          <p style="margin: 0;">BookVilla India • 14 College Street / MG Road Bangalore • support@bookvilla.in</p>
          <p style="margin: 4px 0 0;">Preserving the Heritage of Indian Literature &amp; Philosophy</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: order.customerEmail,
      subject: `Order Confirmation: ${order.orderNumber} - BookVilla India`,
      text: `Namaste ${order.customerName}, your BookVilla order ${order.orderNumber} for ₹${order.totalAmount} has been placed.`,
      html: htmlContent
    });

    console.log(`[EMAIL] 📬 Order email dispatched to ${order.customerEmail} (ID: ${info.messageId})`);
    if (nodemailer.getTestMessageUrl && info.messageId) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log(`[EMAIL] 🔗 View Ethereal Email Preview: ${previewUrl}`);
      }
    }
    return info;
  } catch (error) {
    console.error('[EMAIL] ❌ Failed to send order confirmation email:', error.message);
    // Don't fail the order if email fails
    return null;
  }
}

/**
 * Send inquiry confirmation email
 */
export async function sendContactReceiptEmail({ name, email, subject, message }) {
  try {
    const transporter = await getTransporter();
    const fromAddress = process.env.EMAIL_FROM || '"BookVilla Support" <contact@bookvilla.in>';

    const info = await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: `Inquiry Received: ${subject} - BookVilla`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: auto; padding: 20px; background: #FDFBF7; border: 1px solid #EAE0D5;">
          <h2 style="color: #1E3A2F;">Namaste ${name},</h2>
          <p style="color: #3A352F;">Thank you for writing to BookVilla. We have received your inquiry regarding "<strong>${subject}</strong>".</p>
          <div style="background: #F4EBE1; padding: 12px; border-radius: 4px; font-style: italic;">
            "${message}"
          </div>
          <p style="color: #3A352F; margin-top: 16px;">Our bibliophiles and curation team in India will respond within 24 hours.</p>
          <p style="color: #6F6A61; font-size: 12px;">BookVilla Customer Relations Team</p>
        </div>
      `
    });

    console.log(`[EMAIL] 📬 Contact acknowledgment dispatched to ${email}`);
    return info;
  } catch (error) {
    console.error('[EMAIL] ❌ Failed to send contact receipt email:', error.message);
    return null;
  }
}
