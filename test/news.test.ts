import supertest from 'supertest';
import app from '../src/index';
import 'dotenv/config';
import { Server, IncomingMessage, ServerResponse } from 'http';

// test('add 1 and 2', () => {
//   expect(1 + 2).toBe(3);
// });

test('expect 200', async () => {
  await supertest(app)
    .get('/news')
    .expect(200)
    .then((res) => {
      expect(res && res.body && typeof res.body === 'object');
    });
});
