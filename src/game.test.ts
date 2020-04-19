import Game, { IGame } from "./game";
import unit, { Iunit } from "./unit";
import Board, { IBoard } from "./board";

describe("constructor", () => {
  let instance: IGame;
  let boardInstance: IBoard;
  let unitInstanceOne: Iunit;
  let unitInstanceTwo: Iunit;

  beforeEach(() => {
    boardInstance = new Board(3);
    unitInstanceOne = unit.Build(1, { x: 0, y: 0 });
    unitInstanceTwo = unit.Build(2, { x: 0, y: 1 });
    instance = new Game(boardInstance, [unitInstanceOne, unitInstanceTwo]);
  });
  it("should be an instance of BoardCreation", () => {
    expect(instance).toBeInstanceOf(Game);
  });
  it.only("places both units on the board", () => {
    expect(boardInstance.unitList).toContain(unitInstanceOne);
    expect(boardInstance.unitList).toContain(unitInstanceTwo);
  });
});
