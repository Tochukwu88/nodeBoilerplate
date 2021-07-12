const { TestWatcher } = require('jest');
const request = require('supertest');
const { app, authinstance } = require('./app');

describe('POST /register', () => {
  describe('given  name,email,password', () => {
    test('should respond with a status code of 200', async () => {
      const response = await request(app).post('/register').send({
        name: 'tochukwu',
        email: 'test@tes.com',
        password: '123456',
      });
      expect(response.statusCode).toBe(200);
    });
  });
  describe('missing either name,email,password', () => {
    test('should respond with a status code of 400', async () => {
      const resp = await request(app).post('/register').send({
        name: 'test',
        password: '123454',
      });
      expect(resp.statusCode).toBe(400);
    });
  });
});
