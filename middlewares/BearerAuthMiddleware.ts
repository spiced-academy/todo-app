import { NextRequest, NextResponse } from "next/server";

export default async function BearerAuthMiddleware(req: NextRequest, res: NextResponse) {
    const excludedPaths = ["/api/login", "/api/openapi", "/api/auth/"];
    if (!req.nextUrl.pathname.startsWith("/api/") || excludedPaths.some(path => req.nextUrl.pathname.includes(path))) {
        return NextResponse.next();
    }

    const token = req.headers.get("Authorization")?.split(" ")[1].replace("Bearer ", "");
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Set the token in the response cookies instead of the request
    req.cookies.set("next-auth.session-token", token);
    NextResponse.next();

    // const decodedToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

}