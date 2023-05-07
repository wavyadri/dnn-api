import axios from 'axios';
import cheerio from 'cheerio';
import moment from 'moment';
import pool from '../../db/index';
import { Source, ArticlesResponse, Article } from '../types';
import { sources } from './sources';
import { QueryResult } from 'pg';
import { AnyARecord } from 'dns';

export const getDuplicateArticles = async (
  title: string
): Promise<QueryResult<any>> => {
  const duplicateArticles = await pool.query(
    'SELECT * FROM articles WHERE title = $1',
    [title]
  );

  return duplicateArticles;
};

export const scrapeArticles = async (
  sources: Source[]
): Promise<ArticlesResponse> => {
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

      // skip if db already contains this article
      // const duplicates = await getDuplicateArticles(title);
      // if (duplicates.rowCount > 0) {
      //   console.log('here for source', source.website);
      //   return;
      // }

      const url = $(el).find(source.anchorTag).attr('href');

      const date = $(el)
        .find(source.dateTag)
        .text()
        .replace(/\n/g, '')
        .replace(/\t/g, '')
        .trim();
      const formatDate = moment(date).format('ll');

      await pool.query(
        'INSERT INTO articles (title, url, source, date) VALUES ($1, $2, $3, $4)',
        [title, source.base + url, source.name, formatDate]
      );
    });
  }

  const res = await pool.query('SELECT * FROM articles');
  return { meta: { rowCount: res.rowCount }, data: res.rows };
};

export const getSource = (id: string): Source[] => {
  return sources.filter((source) => source.id === id);
};

export const insertArticles = (articles: Article[]) => {
  articles.forEach(async ({ title, url, source, date }) => {
    await pool.query(
      'INSERT INTO articles (title, url, source, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, url, source, date]
    );
  });
};

export const getAllArticles = async (): Promise<ArticlesResponse> => {
  const res = await pool.query('SELECT * FROM articles ORDER BY date DESC');
  return { meta: { rowCount: res.rowCount }, data: res.rows };
};

export const getArticlesByID = async (
  id: string
): Promise<ArticlesResponse> => {
  const res = await pool.query(
    'SELECT * FROM articles WHERE source = $1 ORDER BY date DESC',
    [id]
  );
  return { meta: { rowCount: res.rowCount }, data: res.rows };
};
