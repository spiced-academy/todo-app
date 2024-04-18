import { pool } from "@/db/pg_pool";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const result = await pool.query(
    'SELECT * FROM "Tasks" ORDER BY created_at DESC'
  );
  const tasks = result.rows;
  return NextResponse.json(tasks, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const task = await request.json();
    const { title: taskTitle } = task;
    const result = await pool.query<Task>('INSERT INTO "Tasks" (title) VALUES ($1) RETURNING *', [
      taskTitle,
    ]);
    const record = result.rows[0];
    
    return NextResponse.json(record, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      console.error("An unexpected error occurred");
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 400 });
    }
  }
}
