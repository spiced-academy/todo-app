import ForgotPasswordComponent from '@/components/Auth/ForgotPassword/ForgotPassword';
import { resetPassword } from '@/services/UserService';

export default function ForgotPasswordPage() {
  const handlePasswordReset = async (email: string) => {
    "use server";
    await resetPassword(email);
  };
  return <ForgotPasswordComponent sendPasswordResetEmail={handlePasswordReset} />;
}

