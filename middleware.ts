export { default } from "next-auth/middleware"
import BearerAuthMiddleware from "./middlewares/BearerAuthMiddleware"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest, res: NextResponse) {
    return BearerAuthMiddleware(req, res)
}

export const config = { 
    matcher: [
        "/tasks/:path*",
        "/api/:path*"
    ] 
}

