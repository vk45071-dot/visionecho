import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: import.meta.env.GMAIL_USER,
            pass: import.meta.env.GMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Contact Form" <${import.meta.env.GMAIL_USER}>`,
        to: 'vk.45071@gmail.com',
        subject: 'New Contact Form Message',
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
    });

    return new Response(
        JSON.stringify({ success: true }),
        { status: 200 }
    );
};
