'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const User = require('../../models/user');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

describe('Testing User Routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.user.removeAll);

  describe('POST', function() {
    beforeAll(() => {
      this.userFake = {
        name : faker.name.firstName(),
        username : faker.internet.userName(),
        password: 'fakepass',
        email: faker.internet.email()};

      return mocks.user.createOne()
        .then(userData => this.userData = userData)
        .then(() => {
          return superagent.post(':4404/api/signup')
            .set('Authorization', `Bearer ${this.userData.token}`)
            .send(this.userFake);
        })
        .then(res => this.res = res)
        .catch(console.error);
    });

    describe('Valid requests', () => {
      test('should return a status of 201', () => {
        return superagent.post(':4404/api/signup')
          .send({
            name : faker.name.firstName(),
            username : faker.internet.userName(),
            password: 'fakepass',
            email: faker.internet.email()})
          .then(expect(this.res.status).toBe(200));
      });

      xdescribe('invalid request', () => {
        test('should return a status of 400', () => {
          return superagent.post(':4404/api/signup')
            .send({ name: 'a thing'})
            .then(expect(this.res.status).toBe(400));
        });
      });
    });

    describe('GET', function() {
      describe('valid requests', () => {
        beforeAll(() => {
          return mocks.user.createOne()
            .then(userData => {
              this.tempUser = userData.user;

              return superagent.get(':4444/api/signin')
                .auth(userData.user.username, userData.password)
                .then(res => this.res = res);
            });
        });
        test('should return a 200 status', () => {
          (expect(this.res.status).toBe(200));
        });
      });
    });

    xdescribe('invalid request', () => {
      test('should return a 404', () => {
        return superagent.get(':4404/api/signup/fakepath')
          .then(expect(this.res.status).toBe(404));
      });
    });
  });
});
