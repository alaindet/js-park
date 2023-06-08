import { ValetValidator, ValetValidatorsFn } from './types';

export function optional(
  condition: boolean | ((val?: any) => boolean),
  validators: ValetValidator[],
): ValetValidator[] | ValetValidatorsFn {

  if (typeof condition === 'function') {
    return (val?: any) => condition(val) ? validators : [];
  }

  return condition ? validators : [];
}
