import { Unit, IUnit } from "./unit";

class TestUnit extends Unit {}

describe("unit.ts", () => {
  let testUnit: IUnit;
  const testCoords1 = { x: 0, y: 0 };
  const testCoords2 = { x: 1, y: 1 };

  beforeEach(() => {
    testUnit = new TestUnit(testCoords1);
  });
  describe("constructor of Unit Class", () => {
    it("creates an instance of Unit Class", () => {
      expect(testUnit).toBeInstanceOf(Unit);
    });
    it("sets public props correctly", () => {
      expect(testUnit.coordinates).toEqual(testCoords1);
      expect(testUnit.id).toBeTruthy();
    });
  });
  describe("get coordinates", () => {
    it("returns coordinates ", () => {
      expect(testUnit.coordinates).toEqual(testCoords1);
    });
  });
  describe("set coordinates", () => {
    it("sets coordinates to given new coordinates", () => {
      testUnit.coordinates = testCoords2;
      expect(testUnit.coordinates).toEqual(testCoords2);
    });
  });
});
