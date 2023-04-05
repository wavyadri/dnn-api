import { Request, Response, NextFunction } from 'express';
import { getSources, getSource, sources } from '../utils';

export const getNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allArticles = await getSources(sources);
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

export const getNewsBySourceID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sourceID = req.params.id;
  const source = getSource(sourceID);
  try {
    const sourceIDArticles = await getSources(source);
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
