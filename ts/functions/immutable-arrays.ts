export function immutableInsertAt<T = any>(arr: T[], index: number, item: T): T[] {

  if (index < 0 || index > arr.length - 1) {
    return arr;
  }

  return [ ...arr.slice(0, index), item, ...arr.slice(index) ];
}

export function immutableUpdateAt<T = any>(arr: T[], index: number | undefined, item: T): T[] {

  if (typeof index === 'undefined' || index < 0 || index > arr.length - 1) {
    return arr;
  }

  return [ ...arr.slice(0, index), item, ...arr.slice(index + 1)];
}

export function immutableUpdateWith<T = any>(arr: T[], index: number, fn: (item: T) => T): T[] {
  return immutableUpdateAt(arr, index, fn({ ...arr[index] }));
}


export function immutableRemoveAt<T = any>(arr: T[], index: number): T[] {

  if (index < 0 || index > arr.length - 1) {
    return arr;
  }

  return [ ...arr.slice(0, index), ...arr.slice(index + 1) ];
}

export function immutableSort<T = any>(arr: T[], fn?: (a: T, b: T) => number): T[] {
  if (fn) {
    return [...arr].sort(fn);
  }

  return [...arr].sort();
}
