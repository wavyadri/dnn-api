import axios from 'axios';
import cheerio from 'cheerio';
import { Source, Article } from './types';

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

export const getSources = async (sources: Source[]): Promise<Article[]> => {
  const articles: Article[] = [];
  for (const source of sources) {
    const { data }: { data: string } = await axios.get(source.website);
    const $ = cheerio.load(data);
    const sourceIDArticles: Article[] = [];

    $(
      'a:contains("digital nomad"), a:contains("Digital Nomad"), a:contains("Digital nomad")',
      data
    ).each((_idx, el) => {
      const title = $(el).text().replace(/\n/g, '').replace(/\t/g, '');
      const url = $(el).attr('href');

      sourceIDArticles.push({
        title,
        url: source.base + url,
        source: source.name,
      });
    });
    articles.push(...sourceIDArticles);
  }
  return articles;
};

export const getSource = (id: string): Source[] => {
  return sources.filter((source) => source.id === id);
};
