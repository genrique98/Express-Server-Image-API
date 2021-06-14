import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});

describe('Test image processing endpoint responses', () => {
  it('gets the images endpoint with parameter "filename=fjord" ', async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(200);
  });

  it('gets and process the images endpoint with parameters "filename=fjord&width=200&height=200" ', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });
});
