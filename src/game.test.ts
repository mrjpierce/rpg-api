import Game, { IGame } from "./game";
import { IUnit, Unit } from "./unit";
import Board, { IBoard } from "./board";

describe("constructor", () => {
  let instance: IGame;
  let boardInstance: IBoard;
  let unitInstanceOne: IUnit;
  let unitInstanceTwo: IUnit;

  beforeEach(() => {
    boardInstance = new Board(3);
    unitInstanceOne = new Unit({ x: 0, y: 0 });
    unitInstanceTwo = new Unit({ x: 0, y: 1 });
    instance = new Game(instance);
  });
  it("should be an instance of BoardCreation", () => {
    expect(instance).toBeInstanceOf(Game);
  });
  it.only("places both units on the board", () => {
    expect(boardInstance.unitList).toContain(unitInstanceOne);
    expect(boardInstance.unitList).toContain(unitInstanceTwo);
  });
});
