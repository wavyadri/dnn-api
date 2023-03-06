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
// sources.forEach((source) => {
//   axios
//     .get(source.website)
//     .then((response) => {
//       const html = response.data;
//       const $ = cheerio.load(html);

//       // capture title, url, source of all relevant articles
//       $('a:contains("digital nomad"), a:contains("Digital Nomad")', html).each(
//         () => {
//           // replace null chars
//           const title = $(this).text().replace(/\n/g, '').replace(/\t/g, '');

//           const url = $(this).attr('href');

//           articles.push({ title, url: source.base + url, source: source.name });
//         }
//       );
//     })
//     .catch((error) => console.log('ok'));
// });

// app.get('/news', (req, res) => {
//   res.json(articles);
// });

// app.get('/news/:sourceID', async (req, res) => {
//   const sourceID = req.params.sourceID;
//   const source = sources.filter((source) => source.id === sourceID)[0];
//   const sourceWebsite = source.website;

//   try {
//     const { data }: { data: string } = await axios.get(sourceWebsite);
//     const $ = cheerio.load(data);
//     const sourceIDArticles: Article[] = [];

//     $('a:contains("digital nomad"), a:contains("Digital Nomad")', data).each(
//       () => {
//         const title = $(this).text().replace(/\n/g, '').replace(/\t/g, '');
//         let url = $(this).attr('href');

//         sourceIDArticles.push({
//           title,
//           url: source.base + url,
//           source: source.name,
//         });
//       }
//     );
//     res.json(sourceIDArticles);
//   } catch (err) {
//     console.error(err);
//   }
// });
