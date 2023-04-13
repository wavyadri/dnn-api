import { Source } from '../types';

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
