import express from 'express';
import 'dotenv/config';
import news from './routes/news';

const app = express();

app.get('/', (req, res) => {
  res.send('welcome to Digital Nomad News');
});

app.use('/news', news);

export default app;
