const request = require('supertest');

const app = require('../src/app');

// Response should be JSON
describe('GET /api/v1/events', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/events')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });
});
