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
        expect(this.res.status).toBe(200);
      });

      describe('invalid request', () => {

      });
    });

    describe('GET', function() {
      describe('valid requests', () => {

      });

      describe('invalid request', () => {

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
