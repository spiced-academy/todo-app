import { NextApiRequest, NextApiResponse } from 'next';

import { pool } from '@/db/pg_pool';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") {
    const tasks = (await pool.query<Task>('SELECT * FROM \"Tasks\" WHERE completed = false ORDER BY created_at DESC')).rows
    return response.status(200).json(tasks);
  }
}
