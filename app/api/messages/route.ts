// app/api/sse/route.js
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const stream = new ReadableStream({
        start(controller) {
            const encoder = new TextEncoder();

            const sendEvent = (data: unknown) => {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
            };

            // Example: Send a message every 5 seconds
            const intervalId = setInterval(() => {
                sendEvent({ unreadMessages: Math.floor(Math.random() * 10) });
            }, 5000);

            // Handle client disconnection
            request.signal.addEventListener('abort', () => {
                clearInterval(intervalId);
                controller.close();
            });
            request.signal.addEventListener('close', () => {
                clearInterval(intervalId);
                controller.close();
            });
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    });
}
