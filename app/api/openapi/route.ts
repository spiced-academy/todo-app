// app/api/openapi/route.js
import fs from 'fs';
import path from 'path';

export const GET = () => {
  const filePath = path.join(process.cwd(), 'docs', 'openapi.json');
  const spec = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return new Response(JSON.stringify(spec), {
    headers: { 'Content-Type': 'application/json' },
  });
};
