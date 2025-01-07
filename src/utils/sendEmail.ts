export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  productName?: string;
}) {
  const { default: sgMail } = await import('@sendgrid/mail');
  sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

  const msg = {
    to: 'info@atrehitim.co.il',
    from: {
      email: 'contact-form@atrehitim.co.il',
      name: 'Atrehitim Website'
    },
    replyTo: {
      email: data.email,
      name: data.name
    },
    subject: `Contact Form: ${data.name} - ${data.phone}`,
    text: `
      New contact form submission from website:
      
      From: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      
      Message:
      ${data.message}
      
      ${data.productName ? `Product: ${data.productName}` : ''}
    `.trim(),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Website Contact</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 3px;">
            ${data.message}
          </div>
          ${data.productName ? `<p><strong>Product:</strong> ${data.productName}</p>` : ''}
        </div>
      </div>
    `,
    trackingSettings: {
      clickTracking: {
        enable: false
      },
      openTracking: {
        enable: false
      }
    },
    headers: {
      'X-Entity-Ref-ID': `contact-form-${Date.now()}`
    }
  };

  try {
    console.log('Attempting to send email with configuration:', {
      to: msg.to,
      from: msg.from,
      subject: msg.subject,
      replyTo: msg.replyTo
    });

    const response = await sgMail.send(msg);
    console.log('Email sent successfully:', {
      messageId: response[0]?.headers['x-message-id'],
      statusCode: response[0]?.statusCode
    });
    return { success: true };
  } catch (error) {
    console.error('SendGrid Error:', {
      message: error.message,
      response: error.response?.body,
      code: error.code
    });
    throw error;
  }
}