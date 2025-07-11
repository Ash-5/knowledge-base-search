from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer

app = Flask(__name__)

model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route('/embedding', methods=['POST'])
def embed():
    data = request.get_json()
    texts = data.get('texts', [])
    if not texts:
        return jsonify({'error': 'No texts provided'}), 400
    embeddings = model.encode(texts).tolist()

    return jsonify({'embeddings': embeddings})

if __name__ == '__main__':
    app.run(port=8000)
