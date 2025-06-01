import express from 'express';
import { getEmbedding } from '../embeddingClient.js';
import { fullSearch, hybridSearch } from '../search.js';
import { HttpStatusCode } from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const { query } = req.body;

        if (!query) {
            return res.status(HttpStatusCode.BadRequest).json({
                error: 'Query is required'
            });
        }

        const queryEmbedding =  await getEmbedding(query);
        const fullTextIds = fullSearch(query);

        const results = hybridSearch(queryEmbedding, fullTextIds);

        return res.status(HttpStatusCode.Ok).json({
            results
        });
    }catch (error) {
    console.error('Error in query route:', error);
    }
});

export default router;
