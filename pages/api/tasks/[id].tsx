import { pool } from "@/db/pg_pool";
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/db/connect';
import Task from '@/db/models/Task';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { id } = request.query;

  if (!id) {
    return;
  }
  // await dbConnect();

  if (request.method === "DELETE") {
    await pool.query("DELETE FROM \"Tasks\" WHERE id = $1", [id])
    // await Task.findByIdAndDelete(id);

    response.status(200).json({ message: "Success!" });
  }

  if (request.method === "PUT") {
    // const task = await Task.findById(id);
    const task = (await pool.query("SELECT * FROM \"Tasks\" WHERE id = $1", [id])).rows[0]

    if (!task) {
      response.status(404).json({ status: "Task not found" });
      return;
    }

    // await Task.findByIdAndUpdate(id, {
    //   $set: { title: request.body },
    // });
    await pool.query("UPDATE \"Tasks\" SET title = $1 WHERE id = $2", [request.body.title, id] )

    response.status(200).json({
      status: `Task ${id} was successfully edited!`,
    });
  }

  if (request.method === "PATCH") {
    // let task = await Task.findById(id);
    const task = (await pool.query("SELECT * FROM \"Tasks\" WHERE id = $1", [id])).rows[0]

    if (!task) {
      response.status(404).json({ status: "Task not found" });
      return;
    }

    // task = await Task.findByIdAndUpdate(
    //   id,
    //   {
    //     $set: { completed: !task.completed },
    //   },
    //   { new: true }
    // );
    await pool.query("UPDATE \"Tasks\" SET completed = $1 WHERE id = $2", [!task.completed, id] )

    response.status(200).json(task);
  }
}
