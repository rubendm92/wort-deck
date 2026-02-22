import type { VercelRequest, VercelResponse } from '@vercel/node';
import { TursoNounsRepository } from '../infrastructure/turso-nouns-repository.js';
import * as nounService from '../domain/noun-service.js';

const repository = new TursoNounsRepository();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { count, tags, shuffle } = req.query;

    const options = {
        count: count ? parseInt(count as string, 10) : undefined,
        tags: tags ? (Array.isArray(tags) ? tags : [tags]) as string[] : undefined,
        shuffle: shuffle === 'true',
    };

    const allNouns = await repository.findAll();
    const nouns = nounService.all(allNouns, options);

    res.status(200).json({
        nouns,
        count: nouns.length,
    });
}
