/* eslint-env jest */

jest.useFakeTimers();

const spjaeld = require('./index.js').default;

const mockFn = jest.fn(val => {
  if (val === 'lock') {
    throw new Error('lock');
  }
  return val;
});

it('works with promises', async () => {
  const limitedFn = spjaeld(mockFn, 400);

  expect.assertions(3);

  limitedFn('dock');
  limitedFn('mock');
  jest.runAllTimers();
  expect(setInterval.mock.calls.length).toBe(1);
  limitedFn('wock');
  expect(setInterval.mock.calls.length).toBe(2);
  expect(setInterval.mock.calls[0][1]).toBe(400);
});

it('rejects on individual exceptions', async () => {
  const limitedFn = spjaeld(mockFn);
  expect.assertions(3);
  const dock = limitedFn('dock');
  const lock = limitedFn('lock');
  const mock = limitedFn('mock');
  expect(dock).resolves.toEqual('dock');
  expect(lock).rejects.toEqual(new Error('lock'));
  expect(mock).resolves.toEqual('mock');
  jest.runAllTimers();
});
