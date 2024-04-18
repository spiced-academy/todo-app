import { pool } from "@/db/pg_pool";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "DELETE") {
    await pool.query<Task>("DELETE FROM \"Tasks\" WHERE id = $1", [id])

    response.status(200).json({ message: "Success!" });
  }

  if (request.method === "PUT") {
    const task = (await pool.query<Task>("SELECT * FROM \"Tasks\" WHERE id = $1", [id])).rows[0]

    if (!task) {
      response.status(404).json({ status: "Task not found" });
      return;
    }

    await pool.query<Task>("UPDATE \"Tasks\" SET title = $1 WHERE id = $2", [request.body.title, id])

    response.status(200).json({
      status: `Task ${id} was successfully edited!`,
    });
  }

  if (request.method === "PATCH") {
    const task = (await pool.query<Task>("SELECT * FROM \"Tasks\" WHERE id = $1", [id])).rows[0]

    if (!task) {
      response.status(404).json({ status: "Task not found" });
      return;
    }

    await pool.query<Task>("UPDATE \"Tasks\" SET completed = $1 WHERE id = $2", [!task.completed, id])

    response.status(200).json(task);
  }
}
