import RegisterComponent from '@/components/Auth/Register/Register';
import { createUser } from '@/services/UserService';

const RegisterPage = () => {
  return <RegisterComponent createUser={createUser} />;
};

export default RegisterPage;

