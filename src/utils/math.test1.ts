// src/utils/math.test.ts

import { add } from './math';

describe('add function', () => {
  test('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds negative and positive number', () => {
    expect(add(-1, 4)).toBe(3);
  });

  test('adds two zeros', () => {
    expect(add(0, 0)).toBe(0);
  });
});
