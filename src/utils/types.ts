export type Source = {
  id: string;
  name: string;
  website: string;
  base: string;
  anchorTag: string;
  articleTag: string;
  dateTag: string;
};

export type Article = {
  title: string;
  url: string;
  source: string;
  date: string;
  views: number;
};

type MetaData = {
  rowCount: number;
};

export type ArticlesResponse = {
  meta: MetaData;
  data: Article[];
};
