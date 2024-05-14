import { authenticateUser } from '@/services/UserService';
import { Account, AuthOptions, Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
        signOut: "/logout",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "eMail", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Example user validation logic
                console.log("credentials", credentials)
                try {
                    return authenticateUser(credentials?.email || "", credentials?.password || "")
                } catch (error) {
                    throw new Error('Invalid email or password');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }: { token: JWT, account: Account | null, user: User|AdapterUser | null }) {
            console.log("jwt", token, account, user);
            
            return token
        },
        async session({ session, token, user }: { session: Session, token: JWT, user: AdapterUser|User|null }) {
            console.log("session", session, token, user);
            if (!session.user) session.user = { name: '', email: '' };
            session.user.name = token.name ?? '';
            return session
        },
    },
}
