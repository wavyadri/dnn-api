import axios from 'axios';
import cheerio from 'cheerio';
import moment from 'moment';
import { Source, Article } from './types';

export const sources: Source[] = [
  {
    id: 'forbes',
    name: 'Forbes',
    website: 'https://www.forbes.com/search/?q=digital%20nomad',
    base: '',
    anchorTag: 'a:contains("Digital Nomad")',
    articleTag: 'article.stream-item',
    dateTag: 'div.stream-item__date',
  },
  {
    id: 'business-insider',
    name: 'Business Insider',
    website: 'https://www.businessinsider.com/s?q=digital+nomad',
    base: 'https://www.businessinsider.com',
    anchorTag:
      'a:contains("digital nomad"), a:contains("Digital nomad"), a:contains("digital-nomad")',
    articleTag: 'section.featured-post',
    dateTag: 'span.js-date-format',
  },
  {
    id: 'traveling-lifestyle',
    name: 'Traveling Lifestyle',
    website: 'https://www.travelinglifestyle.net/?s=digital+nomad',
    base: '',
    anchorTag: 'h2 > a:contains("Digital Nomad")',
    articleTag: 'article.separation-border',
    dateTag: 'time',
  },
];

export const getSources = async (sources: Source[]): Promise<Article[]> => {
  const articles: Article[] = [];
  for (const source of sources) {
    const { data }: { data: string } = await axios.get(source.website);
    const $ = cheerio.load(data);
    const sourceIDArticles: Article[] = [];

    $(source.articleTag, data).each((_idx, el) => {
      const title = $(el)
        .find(source.anchorTag)
        .text()
        .replace(/\n/g, '')
        .replace(/\t/g, '')
        .trim();
      if (!title.length) return;

      const url = $(el).find(source.anchorTag).attr('href');
      const date = $(el)
        .find(source.dateTag)
        .text()
        .replace(/\n/g, '')
        .replace(/\t/g, '')
        .trim();

      // TODO fix for business-insider
      const formatDate = moment(date).format('ll');

      sourceIDArticles.push({
        title,
        url: source.base + url,
        source: source.name,
        date: formatDate,
      });
    });

    articles.push(...sourceIDArticles);
  }
  return articles;
};

export const getSource = (id: string): Source[] => {
  return sources.filter((source) => source.id === id);
};
