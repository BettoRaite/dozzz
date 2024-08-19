import { ColliderList } from "./collider.ts";
import { describe, test, expect } from "vitest";
import { Entity } from "../entity.ts";
import { bubbleSortCopy } from "../utils/sort/bubble-sort.ts";

describe("collider", () => {
  test("prepend", () => {});
  describe("sort", () => {
    test("must keep linked list sorted", () => {
      const values = [0, 6, 1, 4];
      const sorted = bubbleSortCopy(values);
      const colliderList = new ColliderList();

      for (const v of values) {
        const entity = new Entity();
        colliderList.set(entity, v);
        colliderList.sort(entity);
      }

      expect(colliderList.getAll()).toEqual(sorted);
    });
  });
});
