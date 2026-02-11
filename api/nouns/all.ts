import type { VercelRequest, VercelResponse } from '@vercel/node';
import { all } from './nouns.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { count, tags, shuffle } = req.query;

    const options = {
        count: count ? parseInt(count as string, 10) : undefined,
        tags: tags ? (Array.isArray(tags) ? tags : [tags]) as string[] : undefined,
        shuffle: shuffle === 'true',
    };

    const nouns = all(options);

    res.status(200).json({
        nouns,
        count: nouns.length,
    });
}
