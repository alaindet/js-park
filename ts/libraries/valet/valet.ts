import { validateObject } from './validators';
import { isBoolean, isDate, isNumber, isObjectWithId, isString, max, maxLen, min, minLen, required } from './rules';
import { optional } from './optional';

export const Valet = {
  validateObject,
  optional,
  rules: {
    required,
    maxLen,
    minLen,
    min,
    max,
    isObjectWithId,
    isDate,
    isBoolean,
    isString,
    isNumber,
  },
};
