import Player, { IPlayer } from "./player";
import Board, { IBoard } from "./board";
jest.mock("./board");

// Task 3: Write tests for move function on player

describe("Player", () => {
  let player: IPlayer;
  let board: IBoard;

  beforeEach(() => {
    board = new Board(3); //TODO: https://jestjs.io/docs/en/es6-class-mocks, jest.fn
    player = Player.Build(2, { x: 0, y: 0 });
  });

  describe("move", () => {
    it("should change XPos to correct value", () => {
      // Arrange
      // None
      // Act
      board.move({ x: 0, y: 0 }, player);

      // Assert
      expect(player).toBe(2);
    });
  });
  describe("move", () => {
    it("should change YPos to correct value", () => {
      board.move({ x: 0, y: 0 }, player);

      expect(player).toBe(1);
    });
  });
});
