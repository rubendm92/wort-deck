import type { VercelRequest, VercelResponse } from '@vercel/node';
import { TursoNounsRepository } from './infrastructure/turso-nouns-repository.js';

const repository = new TursoNounsRepository();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nouns } = req.body;

  if (!nouns || !Array.isArray(nouns)) {
    return res.status(400).json({ error: 'Invalid request: nouns array required' });
  }

  await repository.save(nouns);

  res.status(200).json({ success: true, count: nouns.length });
}
