import axios from 'axios';
import cheerio from 'cheerio';
import { Source, Article } from './types';

const articles: Article[] = [];

export const sources: Source[] = [
  {
    id: 'forbes',
    name: 'Forbes',
    website: 'https://www.forbes.com/search/?q=digital%20nomad',
    base: '',
  },
  {
    id: 'business-insider',
    name: 'Business Insider',
    website: 'https://www.businessinsider.com/s?q=digital+nomad',
    base: 'https://www.businessinsider.com',
  },
  {
    id: 'traveling-lifestyle',
    name: 'Traveling Lifestyle',
    website: 'https://www.travelinglifestyle.net/?s=digital+nomad',
    base: '',
  },
];

export const getSources = () => {
  sources.forEach((source) => {
    axios
      .get(source.website)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        // capture title, url, source of all relevant articles
        $(
          'a:contains("digital nomad"), a:contains("Digital Nomad")',
          html
        ).each(() => {
          // replace null chars
          const title = $(this).text().replace(/\n/g, '').replace(/\t/g, '');

          const url = $(this).attr('href');

          articles.push({ title, url: source.base + url, source: source.name });
          return articles;
        });
      })
      .catch((error) => console.log('ok'));
  });
};

export const getSource = (id: string): Source => {
  return sources.filter((source) => source.id === id)[0];
};
