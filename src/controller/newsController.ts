import { Request, Response, NextFunction } from 'express';
import { scrapeArticles, getSource } from '../utils/scraper';
import { selectAllArticles, selectArticlesByID } from '../utils/queries';
import { sources } from '../utils/sources';

export const getNews = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await scrapeArticles(sources);

    const allArticles = await selectAllArticles();
    return res.status(200).json(allArticles);
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

export const getNewsBySource = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sourceID = req.params.id;
  const source = getSource(sourceID);
  try {
    await scrapeArticles(source);

    const sourceArticles = await selectArticlesByID(source[0].name);
    return res.status(200).json(sourceArticles);
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
