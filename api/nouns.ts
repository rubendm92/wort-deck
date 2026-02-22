import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // TODO: Implement actual save logic with Turso
  // Expected body: { nouns: Noun[] }

  const { nouns } = req.body;

  if (!nouns || !Array.isArray(nouns)) {
    return res.status(400).json({ error: 'Invalid request: nouns array required' });
  }

  // For now, just return success
  res.status(200).json({
    success: true,
    message: 'Nouns saved successfully',
    count: nouns.length,
  });
}
