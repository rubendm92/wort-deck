import type { VercelRequest, VercelResponse } from '@vercel/node';
import { words } from './data/words.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.status(200).json({
    words,
    count: words.length,
  });
}
