import { redirect } from "next/navigation"

import { getServerSession } from "next-auth"
import { authOptions } from "@/nextauth/authOptions"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect("/login")
    }

    return redirect("/tasks")
}

