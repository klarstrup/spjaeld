'use strict';
jest.useFakeTimers();

const spjaeld = require('./index.js').default;

const mockFn = jest.fn(val => {
  if(val==='lock') {
    throw new Error('lock');
  }
  return val;
});

beforeEach(() => {
});

it('works with promises', async () => {
  const limitedFn = spjaeld(mockFn, 400);

  expect.assertions(2);

  limitedFn('dock')
//  limitedFn('lock')
  limitedFn('mock')
  jest.runAllTimers();
  limitedFn('wock')
  expect(setInterval.mock.calls.length).toBe(2);
  expect(setInterval.mock.calls[0][1]).toBe(400);
});

it('rejects on individual exceptions', async () => {
  const limitedFn = spjaeld(mockFn);
  expect.assertions(2);
  const dock = limitedFn('dock');
  const lock = limitedFn('lock');
  expect(dock).resolves.toEqual('dock');
  expect(lock).rejects.toEqual(new Error('lock'));
  jest.runAllTimers();
});