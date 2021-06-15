import supertest from 'supertest';
import app from '../index';
import { logSharp } from '../utilities/util';
import { existsSync } from 'fs';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});

describe('Test image processing endpoint responses', () => {
  it('gets the images endpoint with parameter "filename=fjord", expects response to be image/jpeg', async () => {
    const response = await request
      .get('/api/images?filename=fjord')
      .expect('Content-type', 'image/jpeg');
    expect(response.status).toBe(200);
  });

  it('does not get the images endpoint with parameter "filename=fjd" ', async () => {
    const response = await request.get('/api/images?filename=fjd');
    expect(response.status).toBe(404);
  });

  it('gets and process the images endpoint with parameters "filename=fjord&width=200&height=200" ', async () => {
    const response = await request
      .get('/api/images?filename=fjord&width=200&height=200')
      .expect('Content-type', 'image/jpeg');
    expect(response.status).toBe(200);
  });

  it('process the image using Sharp', async () => {
    const filename = 'fjord';
    const width = 200;
    const height = 200;
    const filePath = `images/full/${filename}.jpg`;
    const outputPath = `images/thumb/${filename}_thumb_${width}x${height}.jpg`;
    await logSharp(filePath, outputPath, width, height);

    expect(existsSync(outputPath)).toBeTruthy();
  });
});
