'use strict';
require('jest');
require('../../lib/server');
require('superagent');

describe('Test to get Travis to work', function() {
  test('let us see if Travis is working', () =>{
    expect(true).toBeTruthy();
  });
});
