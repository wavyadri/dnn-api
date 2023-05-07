import pool from '../../db/index';
import { Article, ArticlesResponse } from '../types';

export const insertArticle = async (article: Article) => {
  const { title, url, source, date } = article;
  await pool.query(
    'INSERT INTO articles (title, url, source, date) VALUES ($1, $2, $3, $4) ON CONFLICT (url) DO NOTHING',
    [title, url, source, date]
  );
};

export const selectAllArticles = async (): Promise<ArticlesResponse> => {
  const res = await pool.query('SELECT * FROM articles ORDER BY date DESC');
  return { meta: { rowCount: res.rowCount }, data: res.rows };
};

export const selectArticlesByID = async (
  id: string
): Promise<ArticlesResponse> => {
  const res = await pool.query(
    'SELECT * FROM articles WHERE source = $1 ORDER BY date DESC',
    [id]
  );
  return { meta: { rowCount: res.rowCount }, data: res.rows };
};
