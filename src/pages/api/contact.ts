import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../utils/sendEmail';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Received contact form submission');
    const data = await request.json();
    console.log('Form data:', data);
    
    if (!data.name || !data.email || !data.phone || !data.message) {
      console.log('Missing required fields');
      return new Response(JSON.stringify({
        error: 'All fields are required'
      }), { status: 400 });
    }

    const result = await sendContactEmail(data);
    console.log('Email send result:', result);

    return new Response(JSON.stringify({
      message: 'Email sent successfully',
      result
    }), { status: 200 });
  } catch (error) {
    console.error('Detailed API error:', {
      error: error.toString(),
      stack: error.stack
    });
    return new Response(JSON.stringify({
      error: 'Failed to send email',
      details: error.message
    }), { status: 500 });
  }
};