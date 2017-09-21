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
      this.userFake = { name : faker.name.firstName, username : faker.internet.userName, password: 'fakepass', email: faker.internet.email };

      return mocks.user.createOne()
        .then(userData => this.userData = userData)
        .then(() => {
          return superagent.post(':4404/api/storage')
            .set('Authorization', `Bearer ${this.userData.token}`)
            .send(this.storageFake);
        })
        .then(res => this.res = res);
    });

    describe('Valid requests', () => {
      test('should return a status of 200', () => {
        return superagent.post(`:4404/api/signup/${this.resPost.body._id}`)
          .send(this.userFake)
          .then(expect(this.res.status).toBe(200));
      });

      xdescribe('invalid request', () => {
        test('should return a status of 400', () => {
          return superagent.post(`:4404/api/signup/${this.resPost.body.id}`)
            .send({ name: faker.name.firstName})
            .then(expect(this.res.status).toBe(400));
        });
      });
    });

    xdescribe('GET', function() {
      describe('valid requests', () => {
        test('should return a 204', () => {
          return superagent.get(`:4404/api/signup/${this.resPost.body.id}`)
            .then(expect(this.res.status).toBe(204));
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
