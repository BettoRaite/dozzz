/**
 * @returns sorted array in place.
 */
export function bubbleSort(arr: number[]) {
  for (let i = 0; i < arr.length; ++i) {
    for (let k = 0; k < arr.length - 1 - i; ++k) {
      if (arr[k] > arr[k + 1]) {
        const swap = arr[k + 1];
        arr[k + 1] = arr[k];
        arr[k] = swap;
      }
    }
  }

  return arr;
}
/**
 * @returns copy of arr but sorted.
 */
export function bubbleSortCopy(arr: number[]) {
  const copy = [...arr];
  for (let i = 0; i < copy.length; ++i) {
    for (let k = 0; k < copy.length - 1 - i; ++k) {
      if (copy[k] > copy[k + 1]) {
        const swap = copy[k + 1];
        copy[k + 1] = copy[k];
        copy[k] = swap;
      }
    }
  }

  return copy;
}
