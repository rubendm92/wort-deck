import type { VercelRequest, VercelResponse } from '@vercel/node';
import { all } from './nouns.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const nouns = all();

    res.status(200).json({
        words: nouns,
        count: nouns.length,
    });
}
