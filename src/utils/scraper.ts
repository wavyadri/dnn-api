import axios from 'axios';
import cheerio from 'cheerio';
import moment from 'moment';
import { Source } from './types';
import { sources } from './sources';
import { insertArticle } from './queries';

export const scrapeArticles = async (sources: Source[]): Promise<void> => {
  for (const source of sources) {
    const { data }: { data: string } = await axios.get(source.website);
    const $ = cheerio.load(data);

    $(source.articleTag, data).each(async (_idx, el) => {
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
      const formatDate = moment(new Date(date)).format('ll');

      await insertArticle({
        title,
        url: source.base + url,
        source: source.name,
        date: formatDate,
        views: 0,
      });
    });
  }
};

export const getSource = (id: string): Source[] => {
  return sources.filter((source) => source.id === id);
};
