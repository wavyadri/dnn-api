import express from 'express';
import cheerio from 'cheerio';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on porttttt ${PORT}...`);
});
