// app/api/sse/route.js
import { NextRequest, NextResponse } from 'next/server';
import { addClient, removeClient } from '@/services/SseService';
import { authOptions } from '@/nextauth/authOptions';
import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            controller.enqueue(encoder.encode("data: " + JSON.stringify({ message: "Starting SSE..." }) + "\n\n"));

            const sendEvent = (data: unknown) => {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
            };

            addClient({ id: session.user.id, send: sendEvent });

            req.signal.addEventListener("abort", () => {
                removeClient(session.user.id);
                controller.close();
            });
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        }
    });
}
