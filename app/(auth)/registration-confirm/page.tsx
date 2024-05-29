import dynamic from 'next/dynamic';
import { confirmRegistration } from '@/services/UserService';

const RegistrationConfirmation = dynamic(() => import('@/components/Auth/RegistrationConfirmation/RegistrationConfirmation'), { ssr: false })

const RegistrationConfirmPage = () => {

  return (
    <RegistrationConfirmation confirmRegistration={confirmRegistration} />
  );
};

export default RegistrationConfirmPage;
