import ForgotPasswordComponent from '@/components/Auth/ForgotPassword/ForgotPassword';
import { sendPasswordResetEmail } from '@/services/MailService';
import { createPasswordResetToken } from '@/services/TokenService';

export default function ForgotPasswordPage() {
  const handlePasswordReset = async (email: string) => {
    "use server";
    const token = createPasswordResetToken();
    await sendPasswordResetEmail(email, token);
  };
  return <ForgotPasswordComponent sendPasswordResetEmail={handlePasswordReset} />;
}

