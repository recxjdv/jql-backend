const request = require('supertest');

const app = require('../src/app');

// Response should be JSON
describe('POST /api/v1/lookup', () => {
  it('responds with a 500 error with no POST data', (done) => {
    request(app)
      .post('/api/v1/lookup')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(done);
  });
  it('responds with a json message', (done) => {
    request(app)
      .post('/api/v1/lookup')
      .send({name: 'jquery',version:'3.5.1'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });
  it('bad data should return not found', (done) => {
    const postData = {
      name: 'badpackagename',
      version:'99.99.99'
    };
    const expectedResponse = {
      state: 'not found'
    };
    request(app)
      .post('/api/v1/lookup')
      .send(postData  )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(expectedResponse)
      .expect(200)
      .end(done);
  });
  it('bad data should return ok', (done) => {
    const postData = {
      name: 'recxKnownGood',
      version:'1.2.3'
    };
    const expectedResponse = {
      state: 'ok'
    };
    request(app)
      .post('/api/v1/lookup')
      .send(postData  )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(expectedResponse)
      .expect(200)
      .end(done);
  });
  it('bad data should return vulnerable', (done) => {
    const postData = {
      name: 'recxKnownBad',
      version:'0.0.1'
    };
    const expectedResponse = {
      state: 'vulnerable'
    };
    request(app)
      .post('/api/v1/lookup')
      .send(postData  )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(expectedResponse)
      .expect(200)
      .end(done);
  });

  
});
