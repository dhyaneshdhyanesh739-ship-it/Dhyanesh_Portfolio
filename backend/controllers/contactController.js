import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

// Helper to create a nodemailer transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Email credentials (EMAIL_USER / EMAIL_APP_PASSWORD) are not configured in environment.');
    }
    console.warn('EMAIL_USER or EMAIL_APP_PASSWORD missing. Using fallback mock transporter in development.');
    return {
      sendMail: async (mailOptions) => {
        console.log('================ MOCK EMAIL SEND (DEV) ================');
        console.log(`To: ${mailOptions.to}`);
        console.log(`From: ${mailOptions.from}`);
        console.log(`Reply-To: ${mailOptions.replyTo}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Text:\n${mailOptions.text}`);
        console.log('======================================================');
        return { messageId: 'mock-id-' + Date.now() };
      }
    };
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Validation: required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    // 3. Subject logic:
    // Default subject to "No Subject" if empty or "none" (case insensitive)
    const isSubjectEmptyOrNone = !subject || !subject.trim() || subject.trim().toLowerCase() === 'none';
    const finalSubject = isSubjectEmptyOrNone ? 'No Subject' : subject.trim();

    // Subject for the notification email
    const emailSubject = isSubjectEmptyOrNone 
      ? 'New Contact Form Message' 
      : `Portfolio Contact: ${subject.trim()}`;

    // Save message to Database (matching existing Contact model functionality)
    let newContact;
    try {
      newContact = await Contact.create({
        name: name.trim(),
        email: email.trim(),
        subject: finalSubject,
        message: message.trim()
      });
    } catch (dbError) {
      console.error('Error saving message to MongoDB:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Could not record message. Please try again.'
      });
    }

    // 4. Send Email via Gmail SMTP
    let transporter;
    try {
      transporter = createTransporter();
    } catch (transporterError) {
      console.error('Failed to initialize mail transporter:', transporterError);
      return res.status(500).json({
        success: false,
        message: 'Mail service is currently unavailable. Please try again later.'
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'dhyaneshdhyanesh739@gmail.com',
      to: 'dhyaneshdhyanesh739@gmail.com',
      replyTo: email.trim(),
      subject: emailSubject,
      text: `You have received a new contact message from your portfolio site:\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${finalSubject}\n\nMessage:\n${message.trim()}\n\nSubmitted at: ${newContact.createdAt}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
          <p><strong>Subject:</strong> ${finalSubject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #06b6d4; white-space: pre-wrap; font-style: italic; margin-top: 10px;">${message.trim()}</div>
          <p style="font-size: 11px; color: #777; margin-top: 25px; border-top: 1px solid #eee; padding-top: 10px;">Submitted at: ${newContact.createdAt}</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error('Error sending contact email:', mailError);
      return res.status(500).json({
        success: false,
        message: `Failed to send email: ${mailError.message}`
      });
    }

    // Success response: 200 { success: true, message: "Message sent successfully" }
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error in submitContactForm controller:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected server error occurred. Please try again later.'
    });
  }
};
