import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

// Helper to create a nodemailer transporter
const createTransporter = () => {
  // If SMTP configurations are present in env, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  
  // Fallback: Mock logger transport that logs to console
  console.log('SMTP config missing in environment. Using fallback console mail transport.');
  return {
    sendMail: async (mailOptions) => {
      console.log('================ MOCK EMAIL SEND ================');
      console.log(`To: ${mailOptions.to}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Text:\n${mailOptions.text}`);
      console.log('=================================================');
      return { messageId: 'mock-id-' + Date.now() };
    }
  };
};

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
    }

    // Save to DB
    const newContact = await Contact.create({ name, email, message });

    // Send email notification
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.SMTP_USER || '"Portfolio Contact" <portfolio@localhost>',
      to: process.env.NOTIFICATION_EMAIL || 'dhyaneshdhyanesh739@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from your portfolio site:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nSubmitted at: ${newContact.createdAt}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6366f1; white-space: pre-wrap; font-style: italic;">${message}</div>
          <p style="font-size: 12px; color: #777; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">Submitted at: ${newContact.createdAt}</p>
        </div>
      `,
    };

    let emailSent = false;
    try {
      await transporter.sendMail(mailOptions);
      emailSent = true;
    } catch (mailError) {
      console.error('Error sending email:', mailError.message);
      // We don't fail the request if mail fails, since the DB write succeeded.
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! It has been recorded successfully.',
      data: newContact,
      emailSent
    });
  } catch (error) {
    console.error('Error submitting contact form:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error. Please try again later.' });
  }
};
