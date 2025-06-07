export interface BudgetSplitterOutOfBoundError extends Error {
  name: 'BudgetSplitterOutOfBoundError';
  key: 'money' | 'time' | 'percentage';
}

export function BudgetSplitterOutOfBoundError(
  key: BudgetSplitterOutOfBoundError['key'],
) {
  const message = `Cannot set item ${key} as  negative or greater than max value`;
  const error = new Error(message) as BudgetSplitterOutOfBoundError;
  error.name = 'BudgetSplitterOutOfBoundError';
  error.key = key;
  return error;
}
