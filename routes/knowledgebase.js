import express from 'express';
import { addToIndex } from '../search.js'; // assuming you have this
import { getEmbedding } from '../embeddingClient.js'; // your function to call Python server
import { v4 as uuidv4 } from 'uuid';
import store from '../store.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { text, id = uuidv4() } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing "text" in request body.' });
    }

    const embedding = await getEmbedding(text);

    const existing = store.documents.find(d => d.id === id);
    if (existing) {
      existing.text = text;
      existing.embedding = embedding;
    } else {
      store.documents.push({ id, text, embedding });
    }

    addToIndex(id, text);

    res.json({ message: 'Document stored', id });
  } catch (err) {
    console.error('Error in /knowledgebase:', err);
    res.status(500).json({ error: 'Failed to store document.' });
  }
});

export default router;
