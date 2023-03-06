import cheerio from 'cheerio';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { getSources, getSource } from '../utils';
import { Article } from '../types';

export const getNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send('welcome /News');
  } catch (error) {
    if (error === true) {
      return next(
        res.status(400).json({
          message: 'Invalid details provided.',
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
  const sourceID = req.params.sourceID;
  const source = getSource(sourceID);
  try {
    const { data }: { data: string } = await axios.get(source.website);
    const $ = cheerio.load(data);
    const sourceIDArticles: Article[] = [];

    $('a:contains("digital nomad"), a:contains("Digital Nomad")', data).each(
      () => {
        const title = $(this).text().replace(/\n/g, '').replace(/\t/g, '');
        let url = $(this).attr('href');

        sourceIDArticles.push({
          title,
          url: source.base + url,
          source: source.name,
        });
      }
    );

    return res.json(sourceIDArticles);
  } catch (error) {
    if (error === true) {
      return next(
        res.status(400).json({
          message: 'Invalid details provided.',
        })
      );
    }
    next(error);
  }
};
