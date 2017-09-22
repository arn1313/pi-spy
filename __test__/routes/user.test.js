'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

describe('Testing User Routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.user.removeAll);

  describe('POST to /api/signup', function() {
    beforeAll(() => {
      this.mockUserData = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        name: faker.name.firstName(),
      };

      return superagent.post(':4404/api/signup')
        .send(this.mockUserData)
        .then(res => this.res = res)
        .catch(console.error);
    });
    test('should respond with a token', () => {
      expect(this.res.text).toBeTruthy();
      expect(this.res.text.length > 1).toBeTruthy();
    });
    test('should return a status of 200', () => {
      expect(this.res.status).toBe(200);
    });
  });

  describe('GET to /api/signin', function() {
    beforeAll(() => {
      return mocks.user.createOne()
        .then(userData => {
          this.tempUser = userData.user;

          return superagent.get(':4404/api/signin')
            .auth(userData.user.username, userData.password)
            .then(res => this.res = res);
        });
    });

    test('should return a token', () => {
      expect(this.res.text).toBeTruthy();
      expect(this.res.text.length > 1).toBeTruthy();
    });

    test('should return a status of 200', () => {
      expect(this.res.status).toBe(200);
    });
  });
});
