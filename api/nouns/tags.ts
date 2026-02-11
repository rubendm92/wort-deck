import type {VercelRequest, VercelResponse} from "@vercel/node";
import {tags} from "./nouns.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    res.status(200).json({
        tags: tags(),
    });
}
