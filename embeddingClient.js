// embeddingClient.js
import axios from 'axios';

export async function getEmbedding(text) {
    try {
        const response = await axios.post(
            'http://localhost:8000/embedding',
            { texts: [text] }, // 🟢 wrap text in `texts` array
            {
                headers: {
                    'Content-Type': 'application/json' // 🟢 ensure correct content-type
                }
            }
        );
        return response.data.embeddings[0]; // assuming one embedding
    } catch (error) {
        console.error('Error getting embedding:', error.response?.data || error.message);
        throw error;
    }
}
