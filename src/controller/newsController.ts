import { Request, Response, NextFunction } from 'express';
import {
  scrapeArticles,
  getSource,
  getAllArticles,
  getArticlesByID,
  insertArticles,
} from '../utils/scraper';
import { sources } from '../utils/sources';

export const getNews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const scraped = await scrapeArticles(sources); // scrape
    // insertArticles(scraped); // insert
    // const allArticles = await getAllArticles(); // select all
    return res.status(200).json(scraped);
  } catch (error) {
    if (error === true) {
      return next(
        res.status(400).json({
          message: 'Error retreiving all articles',
        })
      );
    }
    next(error);
  }
};

export const getNewsBySourceID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sourceID = req.params.id;
  const source = getSource(sourceID);
  try {
    await scrapeArticles(source);
    const sourceIDArticles = await getArticlesByID(source[0].name);
    return res.status(200).json(sourceIDArticles);
  } catch (error) {
    if (error === true) {
      return next(
        res.status(400).json({
          message: `Error retreiving ${source[0].website} articles`,
        })
      );
    }
    next(error);
  }
};
