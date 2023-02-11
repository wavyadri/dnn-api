import express from 'express';
import cheerio from 'cheerio';
import axios from 'axios';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;
const articles = [];

app.get('/', (req, res) => {
  res.send('welcome to hi');
});

app.get('/news', (req, res) => {
  axios
    .get('https://www.businessinsider.com/s?q=digital+nomad')
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("digital nomad")', html).each(function (a) {
        const title = $(this).text();
        const url = $(this).attr('href');
        articles.push({ title, url });
      });

      res.json(articles);
    })
    .catch((error) => console.log('ok'));
});

app.listen(PORT, () => {
  console.log(`listening on porttttt ${PORT}...`);
});
