# RAG Backend - Hybrid Search with Node.js

This is a minimal Retrieval-Augmented Generation (RAG) backend that supports document ingestion and hybrid (semantic + keyword) search using Node.js and a local embedding model.

## ✨ Features
- Local embeddings with `sentence-transformers` (MiniLM)
- Hybrid search using:
  - BM25-style keyword frequency
  - Cosine similarity with embedding vectors
- Simple JSON-based document storage
- Clean, minimal Express API

## 🚀 Endpoints

### POST `/knowledgebase`
Ingest a document (a text) into the knowledge base.

**Request:**
```json
{
    "text": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
}
```

Search in document (text)
### POST `/query`
```
{
    "query": "What is Node.js?"
}
```

### Run project
1. Go to `embedding server` direcotry
- Install dependencies
> pip install Flask sentence-transformers
- Run the project
> python embeddingServer.py 

2. In other terminal, inside main direcotry
- Install dependencies
> npm install
- Run project
> node app.js
