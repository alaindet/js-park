import { ValetPropErrors, ValetValidator } from './types';
import { err } from './helpers';

export function required(val?: any): ValetPropErrors | null {

  const isValid = (() => {
    switch (typeof val) {
      case 'number': return true;
      case 'boolean': return true;
      case 'string': return val !== '';
      default: return !!val;
    }
  })();

  return err(isValid, 'required', 'Field is required');
}

export function maxLen(len: number): ValetValidator {
  return (val?: any) => {
    const isValid = val?.length <= len;
    return err(isValid, 'maxLen', `Must have length less than ${len}`);
  };
}

export function minLen(len: number): ValetValidator {
  return (val?: any) => {
    const isValid = val?.length >= len;
    return err(isValid, 'minLen', `Must have length greater than ${len}`);
  };
}

export function min(threshold: number): ValetValidator {
  return (val?: any) => {
    const isValid = val >= threshold;
    return err(isValid, 'min', `Must be greater than ${threshold}`);
  };
}

export function max(threshold: number): ValetValidator {
  return (val?: any) => {
    const isValid = val <= threshold;
    return err(isValid, 'max', `Must be less than ${threshold}`);
  };
}

export function isObjectWithId(val?: any): ValetPropErrors | null {
  const isValid = !!val?.id;
  return err(isValid, 'isObjectWithId', 'Object must have "id" property');
}

export function isDate(val?: any): ValetPropErrors | null {
  const d = new Date(val);
  const isValid = !isNaN(d.getTime());
  return err(isValid, 'isDate', 'Must be a date');
}

export function isBoolean(val?: any): ValetPropErrors | null {
  const isValid = typeof val === 'boolean';
  return err(isValid, 'isBoolean', 'Must be a boolean');
}

export function isString(val?: any): ValetPropErrors | null {
  const isValid = typeof val === 'string';
  return err(isValid, 'isString', 'Must be a string');
}

export function isNumber(val?: any): ValetPropErrors | null {
  const isValid = !isNaN(Number(val));
  return err(isValid, 'isNumber', 'Must be a number');
}
