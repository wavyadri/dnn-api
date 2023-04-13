import express from 'express';
import news from './routes/news';
import 'dotenv/config';

const app = express();

app.get('/', (_req, res) => {
  res.send('welcome to Digital Nomad News');
});

app.use('/news', news);

export default app;
