import { ValetPropErrors } from './types';

export function err(
  isValid: boolean,
  key: string,
  message: string,
): ValetPropErrors | null {
  return isValid ? null : { [key]: message };
}
