import { authenticateUser } from '@/services/UserService';
import { AuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth/core/types';
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
                try {
                    return authenticateUser(credentials?.email || "", credentials?.password || "")
                } catch (error) {
                    throw new Error('Invalid email or password');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token }: { token: JWT, user: User|AdapterUser | null }) {
            return token
        },
        async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
            const modifiedSession = {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub || "",
                }
            }
            return modifiedSession
        },
    },
}
