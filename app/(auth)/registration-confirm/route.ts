import { confirmRegistration } from "@/services/UserService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (email && token) {
        await confirmRegistration(email, token);
    }

    return NextResponse.redirect(new URL(req.url).origin);
}

