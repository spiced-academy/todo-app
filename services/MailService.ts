import nodemailer from 'nodemailer';

/**
 * Sends a registration confirmation email to the newly registered user.
 * @param {string} email - The email address of the user.
 * @param {string} name - The name of the user.
 */
export const sendRegistrationMail = async (email: string, name: string, registrationToken: string): Promise<void> => {
  "use server";
  // Transporter configuration for nodemailer using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: process.env.SMTP_PORT ? +process.env.SMTP_PORT : 1025,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "username",
      pass: "password",
    },
  });
  
  // Generate the confirmation link (placeholder link for demonstration)
  const confirmationLink = `${process.env.BASE_PATH}/registration-confirm?email=${encodeURIComponent(email)}&token=${encodeURIComponent(registrationToken)}`;

  // Email options
  const mailOptions = {
    from: `"${process.env.MAIL_FROM}" <${process.env.MAIL_FROM}>`, // Sender address
    to: email, // List of receivers
    subject: 'Confirm Your Registration', // Subject line
    html: `<p>Hello ${name},</p>
           <p>Thank you for registering. Please click the link below to confirm your registration:</p>
           <a href="${confirmationLink}">Confirm Registration</a>
           <p>If you did not request this, please ignore this email.</p>`, // HTML body content
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Registration confirmation email sent successfully.');
  } catch (error) {
    console.error('Failed to send registration confirmation email:', error);
  }
};
