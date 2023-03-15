export type SortingFn<T = string | number> = (a: T, b: T) => number;
export type AnyDict = { [key: string | number]: any };
  
export function compareAscending(a: string | number, b: string | number): number {
	return (a === b) ? 0 : (a < b ? -1 : 1);
}

export function compareAscendingKey<T extends AnyDict>(key: string | number): SortingFn<T> {
	return (a: T, b: T) => compareAscending(a[key], b[key]);
}
  
export function compareDescending(a: string | number, b: string | number): number {
	return (a === b) ? 0 : (a > b ? -1 : 1);
}

export function compareDescendingKey<T extends AnyDict>(key: string | number): SortingFn<T> {
	return (a: T, b: T) => compareDescending(a[key], b[key]);
}
