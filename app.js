import express from 'express';
import knowledgebase from './routes/knowledgebase.js';
import query from './routes/query.js';

const app = express();
app.use(express.json());

app.use('/knowledgebase', knowledgebase);
app.use('/query', query);

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
