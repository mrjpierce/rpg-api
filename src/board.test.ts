import Board from "./board";
import { IUnit, Unit } from "./unit";
// import Unit from "./unit";
import { ICoordinates } from "./unit";

describe("Board in ./board", () => {
  let board: Board;
  let unit1: IUnit;
  let unit2: IUnit;
  let unitGrid: ReadonlyArray<ReadonlyArray<IUnit | null>>;
  let unitListTest: ReadonlyArray<IUnit>;
  const gridSize = 3;
  // const testId = [0, 1];
  const testStringId1 = "5099803df3f4948bd2f98391";
  const testStringId2 = "1111803df3f4948bd2f00000";
  const newCoords1 = { x: 0, y: 0 };
  const newCoords2 = { x: 2, y: 2 };
  const newCoords3 = { x: 1, y: 1 };
  const testInit1 = { x: 1, y: 1, id: testStringId1 };
  const testInit2 = { x: 0, y: 0, id: testStringId2 };

  const incorrectInputs: ICoordinates[] = [
    { x: "strang" as any, y: 0 },
    { x: 4, y: 0 },
    { x: 0, y: 3 },
    { x: 4, y: 4 }
  ];
  beforeEach(() => {
    unit1 = new Unit(testInit1);
    unit2 = new Unit(testInit2);

    board = new Board(gridSize);
  });
  describe("unitGrid", () => {
    it("returns unit grid with one unit placed on it", () => {
      board.placeunit(newCoords1, unit1);
      unitGrid = board.unitGrid;
      expect(unitGrid).toBe(board.unitGrid);
    });
  });
  describe("unitList", () => {
    it("returns a list of units on the board", () => {
      board.placeunit(newCoords1, unit1);
      unitListTest = board.unitList;
      expect(unitListTest).toBe(board.unitList);
    });
  });
  describe("gridLength", () => {
    it("returns an number of the grid length", () => {
      expect(board.gridLength).toEqual(gridSize);
    });
  });
  describe("constructor", () => {
    it("creates an instance of the Board class", () => {
      expect(board).toBeInstanceOf(Board);
    });
  });
  describe("checkunitList", () => {
    beforeEach(() => {
      board.placeunit(newCoords1, unit1);
    });
    // it("returns true because id provided coresponds with an id of a unit that exists on the unitList", () => {
    //   expect(board.checkunitList(unit1.Id)).toBeTruthy();
    // });
    it("returns false because id provided does not coresponds with an id of a unit that exists on the unitList", () => {
      expect(board.checkunitList(3)).toBeFalsy();
    });
  });
  describe("unitAtCoordinates", () => {
    it("returns a unit because the given coordinates are of a unit on the board", () => {
      board.placeunit(newCoords2, unit2);
      expect(board.unitAtCoordinates(newCoords2)).toMatchObject(unit2);
    });
    it("Error is thrown because there is no unit at provided coordinates ", () => {
      expect(() => board.unitAtCoordinates(newCoords3)).toThrowError(/No unit at given coordinates/);
    });
  });
  describe("move", () => {
    it("moves the unit to the given coordinates cordinates", () => {
      board.placeunit(newCoords1, unit1);
      board.move(newCoords3, unit1);
      expect(board.unitGrid[newCoords3.x][newCoords3.y]).toBe(unit1);
    });
    it("removes unit, changes unit coord, places unit and returns true", () => {
      board.placeunit(newCoords1, unit1);
      expect(board.move(newCoords3, unit1)).toBeTruthy();
    });
    it.each(incorrectInputs)(
      "it will return false because due to inputs not being compatable",
      (coordinates: ICoordinates) => {
        board.move(coordinates, unit1);
        expect(board.move(coordinates, unit1)).toBeFalsy();
      }
    );
    it("throws an error because the provided unit is not on either gird or list", () => {
      expect(() => board.move(newCoords3, unit2)).toThrowError(/Provided unit is not on/);
    });
    it("throws error when the provided unit is not on either gird or list", () => {
      board.placeunit(newCoords1, unit1);
      const foounit = new Unit(unit1.coordinates);
      expect(() => board.move(newCoords2, foounit)).toThrowError(
        /unit id mismatch; unit passed does not match the unit with corresponding id on board/
      );
    });
    // i guess what i am really doing here if the move function will actually throw the error probably could make a more verbose way with .each
    // Yes testing in both places because black box we don't know whats happening inside move method, we are worried about what it returns to the client and that
    // if changing a single method or small code change causes mulitple tests to break and fail it might be a code smell and worth revisiting those test to ensure they are not fraile and easy breakable
  });
  describe("isFree", () => {
    it("returns true because the grid is open on the 3D array", () => {
      expect(board.isFree(newCoords3)).toBeTruthy();
    });
    it("returns falsey because given coordinate grid position is not free", () => {
      board.placeunit(newCoords3, unit2);
      expect(() => board.isFree(newCoords3)).toBeFalsy;
    });
  });
  describe("removeunit", () => {
    it("removes old coordinates and sets them to null", () => {
      board.placeunit(newCoords1, unit1);
      board.removeunit(unit1);
      expect(board.unitGrid[newCoords1.x][newCoords1.y]).toBe(null);
    });
    it("throws error when the provided unit is not on either gird or list", () => {
      expect(() => board.removeunit(unit2)).toThrowError(/Provided unit is not on/);
    });
    // it("throws error when the provided unit is not on either gird or list", () => {
    //   board.placeunit(newCoords31, unit1);
    //   const foounit = unit.Build(unit1.Id, unit1.coordinates);
    //   expect(() => board.removeunit(foounit)).toThrowError(
    //     /unit id mismatch; unit passed does not match the unit with corresponding id on board/
    //   );
    // });
  });
  describe("placeunit", () => {
    it("updates the units coordinates with the new given coordinats", () => {
      board.placeunit(newCoords3, unit1);
      expect(unit1.coordinates.x === newCoords3.x);
      expect(unit1.coordinates.y === newCoords3.y);
    });
    it("adds the unit to the unitList", () => {
      const unitArr = [unit1];
      board.placeunit(newCoords1, unit1);
      expect(board.unitList).toEqual(expect.arrayContaining(unitArr));
    });
    it("throws error that unit cannot be placed because given coordinates are not valid", () => {
      expect(() => board.placeunit(incorrectInputs[1], unit1)).toThrowError(/^unit cannot be placed$/);
    });
    it("throws error that position is not free", () => {
      board.placeunit(newCoords1, unit2);
      expect(() => board.placeunit(newCoords1, unit1)).toThrowError(/^Position is not free$/);
    });
    it("throws error that unit is already on list", () => {
      board.placeunit(newCoords1, unit2);
      expect(() => board.placeunit(newCoords3, unit2)).toThrowError(/^unit already exists on list$/);
    });
    it("unit is added to the unit grid correctly", () => {
      const unitArr = [unit2];
      board.placeunit(newCoords1, unit2);
      expect(board.unitGrid[unit2.coordinates.x]).toEqual(expect.arrayContaining(unitArr));
    });
    it("unit coordinates are updated to new coordinates", () => {
      board.placeunit(newCoords1, unit2);
      expect(unit2.coordinates).toEqual(newCoords1);
    });
  });
});
