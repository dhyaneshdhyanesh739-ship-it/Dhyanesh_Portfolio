import Contact from '../models/Contact.js';
import dns from 'dns';

// Ensure Node prefers IPv4 to prevent local connect timeouts on IPv6-only lookups
dns.setDefaultResultOrder('ipv4first');

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

    // 4. Send Email via Resend API (HTTPS on Port 443)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Failed to send contact email: RESEND_API_KEY is not configured.');
        return res.status(500).json({
          success: false,
          message: 'Mail service configuration error. Please contact the administrator.'
        });
      }

      // Development mock fallback if RESEND_API_KEY is missing
      console.warn('RESEND_API_KEY missing. Using fallback mock transporter in development.');
      console.log('================ MOCK EMAIL SEND (DEV - RESEND) ================');
      console.log(`To: dhyaneshdhyanesh739@gmail.com`);
      console.log(`From: Portfolio Contact <onboarding@resend.dev>`);
      console.log(`Reply-To: ${email.trim()}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Text:\nName: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${finalSubject}\nMessage:\n${message.trim()}`);
      console.log('================================================================');
    } else {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'dhyaneshdhyanesh739@gmail.com',
            reply_to: email.trim(),
            subject: emailSubject,
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
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Resend returned status ${response.status}`);
        }
      } catch (mailError) {
        console.error('Error sending contact email via Resend:', mailError);
        return res.status(500).json({
          success: false,
          message: `Failed to send email: ${mailError.message}`
        });
      }
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
