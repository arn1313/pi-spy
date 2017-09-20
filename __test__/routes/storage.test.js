'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const server = require('../../lib/server');
// const Storage = require('../../models/storage');
const superagent = require('superagent');
require('jest');

describe('Testing Storage Routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.user.removeAll);
  afterEach(mocks.storage.removeAll);

  describe('POST', function() {
    beforeAll(() => {
      this.storageFake = { name: faker.random.word(), desc: faker.random.words(12) };

      return mocks.user.createOne()
        .then(userData => this.userData = userData)
        .then(() => {
          return superagent.post(':4444/api/storage')
            .set('Authorization', `Bearer ${this.userData.token}`)
            .send(this.storageFake);
        })
        .then(res => this.res = res);
    });

    describe('Valid requests', () => {
      test('should return a status of 200', () => {
        return superagent.put(`:4444/api/signup/${this.resPost.body._id}`)
          .send({ name : faker.name.firstName, username : faker.internet.userName, password: 'fakepass', email: faker.internet.email })
          .then(expect(this.res.status).toBe(200));
      });

      describe('invalid request', () => {
        test('should return a status of 400', () => {
          return superagent.put(`:4444/api/signup/${this.resPost.body.id}`)
            .send({ name: faker.name.firstName})
            .then(expect(this.res.status).toBe(400));
        });
      });
    });

    describe('GET', function() {
      describe('valid requests', () => {
        test('should return a 204', () => {
          return superagent.get(`:4444/api/signup/${this.resPost.body.id}`);
        });
      });

      describe('invalid request', () => {
        test('should return a 400', () => {
          return superagent.get(':4444/api/signup/fakepath')
            .then(expect(this.res.status).toBe(400));
        });
      });
    });

    describe('DELETE', function() {
      describe('valid requests', () => {

      });

      describe('invalid request', () => {

      });
    });

  });
});
