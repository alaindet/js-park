export type ValetPropErrors = { [validator: string]: any };
export type ValetErrors = { [key: string]: ValetPropErrors };
export type ValetResult = { errors: ValetErrors; isValid: boolean };
export type ValetValidator = (val?: any) => ValetPropErrors | null;
export type ValetValidatorsFn = (val?: any) => ValetValidator[];
export type ValetSchema = { [key: string]: ValetValidator[] | ValetValidatorsFn };
