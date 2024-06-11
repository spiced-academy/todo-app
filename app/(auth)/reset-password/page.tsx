import { UpdatePasswordComponent } from '@/components/Auth/UpdatePassword/UpdatePassword';
import { updatePassword } from '@/services/UserService';

export default function ResetPasswordPage(props: { searchParams: { email: string, token: string } }) {
    const { email, token } = props.searchParams;
    return <UpdatePasswordComponent updatePassword={updatePassword} email={email} token={token}/>;
}
