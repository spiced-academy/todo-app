import NextAuth, { Account, AuthOptions, Session, User } from 'next-auth';
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
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Example user validation logic
                if (credentials && credentials.username === "jsmith" && credentials.password === "password") {
                    const user:User = { id: "1", name: "J Smith", email: "jsmith@example.com" } // This should be replaced with actual user validation logic
                    return user
                } else {
                    return null
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

