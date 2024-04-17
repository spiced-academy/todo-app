import { pool } from "@/db/pg_pool";
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/db/connect';
import Task from '@/db/models/Task';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  // await client.connect()
  if (request.method === "GET") {
    // const tasks = await Task.find().sort("-created_at");
    const result = await pool.query("SELECT * FROM \"Tasks\" ORDER BY created_at DESC")
    const tasks = result.rows
    console.log(result.rows);
    return response.status(200).json(tasks);
  }

  if (request.method === "POST") {
    try {
      const {title: taskTitle} = request.body;
      const result = await pool.query("INSERT INTO \"Tasks\" (title) VALUES ($1)", [taskTitle])
      const record = result.rows[0]
      // const task = new Task(taskTitle);
      // const record = await task.save();
      return response.status(201).json(record);
    } catch (error: any) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
