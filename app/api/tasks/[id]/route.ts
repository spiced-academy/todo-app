import { NextRequest, NextResponse } from 'next/server';

import { pool } from '@/db/pg_pool';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const task = (await pool.query('SELECT * FROM "Tasks" WHERE id = $1', [id]))
    .rows[0];
  if (!task) {
    return new NextResponse(JSON.stringify({ status: "Task not found" }), { status: 404 });
  }

  await pool.query('UPDATE "Tasks" SET completed = $1 WHERE id = $2', [
    !task.completed,
    id,
  ]);

  return NextResponse.json({ ...task, completed: !task.completed });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const task = (await pool.query('SELECT * FROM "Tasks" WHERE id = $1', [id]))
    .rows[0];
  if (!task) {
    return new NextResponse(JSON.stringify({ status: "Task not found" }), { status: 404 });
  }

  await pool.query('UPDATE "Tasks" SET title = $1 WHERE id = $2', [
    (await request.json()).title,
    id,
  ]);

  return NextResponse.json({
    status: `Task ${id} was successfully edited!`,
  });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  await pool.query('DELETE FROM "Tasks" WHERE id = $1', [id]);
  return NextResponse.json({ message: "Success!" });
}
