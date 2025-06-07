import { test, expect } from 'vitest';
import { BudgetSplitter } from './budget-splitter.js';

test('creates an instance', () => {
  const b = new BudgetSplitter(30_000, 200, []);
  expect(b.totalMoney).toEqual(30_000);
  expect(b.totalTime).toEqual(200);
});
