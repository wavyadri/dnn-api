import axios from 'axios';
import cheerio from 'cheerio';
import moment from 'moment';
import { Source, Article } from '../types';
import { sources } from './sources';

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
  articles.sort(function (a, b) {
    let keyA = new Date(a.date);
    let keyB = new Date(b.date);
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  return articles;
};

export const getSource = (id: string): Source[] => {
  return sources.filter((source) => source.id === id);
};
