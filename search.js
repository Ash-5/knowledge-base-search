import FlexSearch from 'flexsearch';
import store from './store.js';
import { cosineSimilarity } from './utils/utils.js';

export const index = new FlexSearch.Index({ tokenize: 'forward', preset: 'performance' });

export function addToIndex(id, text) {
    index.add(id, text);
}

export function fullSearch(query, limit = 10) {
    const results = index.search(query, { limit });
    const items = results.map(id => store.documents.find(doc => doc.id === id));
    return items.filter(Boolean);
}

export function vectorSearch(query, topK = 10) {
    return store.documents
        .map(doc => ({
            id: doc.id,
            score: cosineSimilarity(doc.embedding, query)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
}

export function hybridSearch(query, fullTextIds, weightText = 0.5, weightVector = 0.5) {
    const textScore = new Map(fullTextIds.map((id, index) => [id, (fullTextIds.length - index)/ fullTextIds.length]));

    const vectorScore = new Map(
        store.documents.map(
            doc => [doc.id, cosineSimilarity(doc.embedding, query)]
        )
    );

    const combined = new Map();

    for (const doc of store.documents) {
        const textScoreValue = textScore.get(doc.id) || 0;
        const vectorScoreValue = vectorScore.get(doc.id) || 0;
        combined.set(doc.id, textScoreValue * weightText + vectorScoreValue * weightVector);
    }

    return [...combined.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, score]) => {
        const doc = store.documents.find(d => d.id === id);
        return { id, text: doc.text, score };
        });
}