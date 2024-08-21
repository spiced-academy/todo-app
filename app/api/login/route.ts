import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const { email, password } = await req.json();

        const csrfResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/csrf`);
        const { csrfToken } = await csrfResponse.json();

        console.log(email, password, csrfToken);

        const params = new URLSearchParams({
            csrfToken: csrfToken || '',
            email: email,
            password: password,
            json: "true",
            redirect: "false",
        }).toString();

        console.log(params)

        const authResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/callback/credentials`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": csrfResponse.headers.get("Set-Cookie") || ""
            },
            body: params,
        })

        if (!authResponse.ok) {
            return NextResponse.json({ error: 'Failed to login' }, { status: 401 })
        }

        const responseData = await authResponse.json();
        const authCookies = authResponse.headers.getSetCookie();
        const sessionToken = authCookies?.find(cookie => cookie.startsWith("next-auth.session-token="))?.split("=")[1].split(";")[0];
        
        return NextResponse.json({ ...responseData, sessionToken });
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: "SyntaxError" }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}