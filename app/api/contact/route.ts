import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the incoming data
    const validatedData = contactSchema.parse(body);

    const { firstName, lastName, email, phone, message } = validatedData;
    const fullName = `${firstName} ${lastName}`;

    // Build the HTML for the email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
        <h2 style="color: #333; margin-top: 0;">New Contact Form Submission - Micasa Doors</h2>
        <p style="color: #555;">You have received a new message from the contact form.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eaeaea; font-weight: bold; width: 30%;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eaeaea;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eaeaea; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eaeaea;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eaeaea; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eaeaea;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eaeaea; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eaeaea; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
          This email was generated from the Micasa Doors website contact form.
        </p>
      </div>
    `;

    // Send the email
    const data = await resend.emails.send({
      from: 'Micasa Doors <noreply@micasadoor.com>',
      to: ['support@micasadoor.com'],
      replyTo: email,
      subject: `New Enquiry from ${fullName}`,
      html: emailHtml,
    });

    if (data.error) {
      console.error('Resend API Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 422 });
    }
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
