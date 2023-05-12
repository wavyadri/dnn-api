import express from 'express';
import cors from 'cors';
import news from './routes/news';
import 'dotenv/config';

const app = express();
app.use(cors());

app.get('/', (_req, res) => {
  res.send('welcome to Digital Nomad News');
});

app.use('/news', news);

export default app;
