import nodemailer from 'nodemailer';

/**
 * Creates and returns a nodemailer transporter instance.
 */
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: process.env.SMTP_PORT ? +process.env.SMTP_PORT : 1025,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USER || "username",
      pass: process.env.SMTP_PASS || "password",
    },
  });
};

/**
 * Sends a registration confirmation email to the newly registered user.
 * @param {string} email - The email address of the user.
 * @param {string} name - The name of the user.
 */
export const sendRegistrationMail = async (email: string, name: string, registrationToken: string): Promise<void> => {
  "use server";
  // Transporter configuration for nodemailer using SMTP
  const transporter = getTransporter();
  
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

export const sendPasswordResetEmail = async (email: string, passwordResetToken: string): Promise<void> => {
  "use server";
  // Transporter configuration for nodemailer using SMTP
  const transporter = getTransporter();

  const resetPasswordLink = `${process.env.BASE_PATH}/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(passwordResetToken)}`;

  const mailOptions = {
    from: `"${process.env.MAIL_FROM}" <${process.env.MAIL_FROM}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Hello,</p>
           <p>You are receiving this email because you have requested a password reset for your account.</p>
           <p>Please click the link below to reset your password:</p>
           <a href="${resetPasswordLink}">Reset Password</a>
           <p>If you did not request this, please ignore this email.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.error('Failed to send password reset email:', error);
  }
}
