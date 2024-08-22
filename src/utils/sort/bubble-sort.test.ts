import { describe, expect, test } from "vitest";
import { bubbleSort, bubbleSortCopy } from "./bubble-sort.ts";
import { sortArr } from "./sort.ts";

describe("bubble sort", () => {
  test("given an array of unsorted items must return an array of sorted items.", () => {
    const a = [0, 4, 5, 1];
    const aSorted = sortArr(a);

    expect(bubbleSort(a)).toEqual(aSorted);
  });
});

describe("bubble sort copy", () => {
  test("given an array of unsorted items must return a copy array of sorted items.", () => {
    const a = [0, 4, 5, 1];

    expect(bubbleSortCopy(a)).not.toBe(a);
  });
});
