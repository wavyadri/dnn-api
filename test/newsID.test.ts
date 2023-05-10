import request from 'supertest';
import app from '../src/app';
import 'dotenv/config';

describe('GET /news/:id', () => {
  it('should return success and an array', async () => {
    await request(app)
      .get('/news/forbes')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.data)).toBeTruthy();
      });
  });

  it('should have a body of type Article', async () => {
    await request(app)
      .get('/news')
      .expect(200)
      .then((res) => {
        expect(res.body.data[0].source).toBeDefined();
        expect(res.body.data[0].title).toBeDefined();
        expect(res.body.data[0].url).toBeDefined();
        expect(res.body.data[0].date).toBeDefined();
        expect(res.body.data[0].views).toBeDefined();
      });
  });
});

describe('Bad GET /news/:id', () => {
  it('should return empty array for unknown id', async () => {
    await request(app)
      .get('/news/the-toronto-star')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.data)).toBeTruthy();
        expect(res.body.data.length).toEqual(0);
        expect(res.body.meta.rowCount).toEqual(0);
      });
  });
});
