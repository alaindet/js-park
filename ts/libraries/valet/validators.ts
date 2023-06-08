import { ValetErrors, ValetPropErrors, ValetResult, ValetSchema, ValetValidator, ValetValidatorsFn } from './types';

export function validateObject(obj: any | undefined, schema: ValetSchema): ValetResult {

  let isValid = true;
  const errors: ValetErrors = {};

  for (const key in schema) {

    // Missing key
    if (!obj.hasOwnProperty(key)) {
      isValid = false;
      errors[key] = { missing: `Property "${key}" is missing from input object` };
      continue;
    }

    const val = obj[key];
    let validators!: ValetValidator[];

    // Optional?
    if (typeof schema[key] === 'function') {
      const validatorsFn = schema[key] as ValetValidatorsFn;
      validators = validatorsFn(obj) as ValetValidator[];
    }

    else {
      validators = schema[key] as ValetValidator[];
    }

    const keyErrors = validateObjectKey(val, validators);

    if (keyErrors !== null) {
      isValid = false;
      const existingErrorsForKey = errors[key] ?? {};
      errors[key] = { ...existingErrorsForKey, ...keyErrors };
      continue;
    }
  }

  return { errors, isValid };
}

function validateObjectKey(val: any, validators: ValetValidator[]): ValetPropErrors | null {
  let errors: ValetPropErrors = {};
  for (const validator of validators) {
    const validatorErrors = validator(val);
    if (validatorErrors !== null) {
      errors = { ...errors, ...validatorErrors };
      return errors;
    }
  }
  return null;
}
