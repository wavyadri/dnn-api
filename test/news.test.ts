import request from 'supertest';
import app from '../src/app';
import 'dotenv/config';

describe('GET /news', () => {
  it('should return success and an array', async () => {
    await request(app)
      .get('/news')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('should have a body of type Article', async () => {
    await request(app)
      .get('/news')
      .expect(200)
      .then((res) => {
        expect(res.body[0].source).toBeDefined();
        expect(res.body[0].title).toBeDefined();
        expect(res.body[0].url).toBeDefined();
      });
  });
});

describe('Bad GET /news', () => {
  it('should return 404 for wrong endpoint', async () => {
    await request(app).get('/newss').expect(404);
  });
});

describe('GET /news/:id', () => {
  it('should return success and an array', async () => {
    await request(app)
      .get('/news/forbes')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('should have a body of type Article', async () => {
    await request(app)
      .get('/news')
      .expect(200)
      .then((res) => {
        expect(res.body[0].source).toBeDefined();
        expect(res.body[0].title).toBeDefined();
        expect(res.body[0].url).toBeDefined();
      });
  });
});

describe('Bad GET /news/:id', () => {
  it('should return empty array for unknown id', async () => {
    await request(app)
      .get('/news/the-toronto-star')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(0);
      });
  });
});
