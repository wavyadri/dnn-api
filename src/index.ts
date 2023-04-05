import express from 'express';
import 'dotenv/config';
import news from './routes/news';

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('welcome to Digital Nomad News');
});

app.use('/news', news);

app.listen(PORT, () => {
  console.log(`listening on porttttt ${PORT}...`);
});

export default app;
