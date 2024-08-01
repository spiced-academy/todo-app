import { NextResponse } from 'next/server';
import prisma from '@/db/client';

export async function GET() {
    try {
        const tasks = await prisma.task.findMany();
        return NextResponse.json(tasks);
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}
