const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with redirect to /', (done) => {
    request(app)
      .get('/api/v1')
      .expect(302)
      .expect('Location', '/')
      .end(done);
  });
});
