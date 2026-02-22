import type { VercelRequest, VercelResponse } from '@vercel/node';
import { TursoNounsRepository } from '../infrastructure/turso-nouns-repository.js';
import * as nounService from '../domain/noun-service.js';

const repository = new TursoNounsRepository();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const allNouns = await repository.findAll();

    res.status(200).json({
        tags: nounService.tags(allNouns),
    });
}
