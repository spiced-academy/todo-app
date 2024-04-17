import { pool } from "@/db/pg_pool";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") {
    const result = await pool.query<Task>("SELECT * FROM \"Tasks\" ORDER BY created_at DESC")
    const tasks = result.rows

    return response.status(200).json(tasks);
  }

  if (request.method === "POST") {
    try {
      const { title: taskTitle } = request.body;
      const result = await pool.query<Task>("INSERT INTO \"Tasks\" (title) VALUES ($1)", [taskTitle])
      const record = result.rows[0]

      return response.status(201).json(record);
    } catch (error) {
      console.error(error);

      return response.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  }
}
