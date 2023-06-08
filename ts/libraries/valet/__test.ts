// nodemon -x npx ts-node ./__test.ts -w .

import { err } from './helpers';
import { ValetPropErrors, ValetSchema, ValetValidator } from './types';
import { Valet } from './valet';

const { required, isNumber, isString } = Valet.rules;

const dataToValidate = {
  foo: 123,
  bar: 'ciao',
  baz: [11, 22, 33],
};

// Custom validator
const isNumbers: ValetValidator = (val?: any): ValetPropErrors | null => {
  let isValid = false;
  if (!!val && Array.isArray(val)) {
    isValid = val.every(n => typeof n === 'number');
  }
  return err(isValid, 'isNumbers', 'Must be an array of numbers');
};

const validationSchema: ValetSchema = {
  foo: [required, isNumber],
  bar: [required, isString],
  baz: [required, isNumbers],
};

const result = Valet.validateObject(dataToValidate, validationSchema);

console.log('Validation result', result);
