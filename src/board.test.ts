import Board from "./board";
import Player, { IPlayer, ICoordinates } from "./player";

describe("Board in ./board", () => {
  let board: Board;
  let player: IPlayer;
  let playerGrid: ReadonlyArray<ReadonlyArray<IPlayer | null>>;
  const gridSize = 3;
  const newCoords = { x: 1, y: 1 };
  const firstCoords = { x: 0, y: 0 };
  const incorrectInputs: ICoordinates[] = [
    { x: "strang" as any, y: 0 },
    { x: 0, y: 4 },
    { x: 10000, y: -15 }
  ];
  // when testing to see that it does throw an error pass the method call to the expect and then use .throws
  // nest or nesting is when it is between the curly braces

  beforeEach(() => {
    player = Player.Build(0, firstCoords);
    board = new Board(gridSize);
  });
  describe("constructor", () => {
    it("should be an instance of Board", () => {
      expect(board).toBeInstanceOf(Board);
    });
  });
  describe("move", () => {
    it("removes player, changes player coord, places player and returns true", () => {
      board.move(newCoords, player);
      expect(board.playerGrid[newCoords.x][newCoords.y]).toBe(player);
    });
    it("removes player, changes player coord, places player and returns true", () => {
      expect(board.move(newCoords, player)).toBeTruthy();
    });
    it("removes old coordinates and sets them to null", () => {
      board.move(newCoords, player);
      expect(board.playerGrid[firstCoords.x][firstCoords.y]).toBe(null);
    });
    it("sets the moving players coordinates to the new give coordinates", () => {
      board.move(newCoords, player);
      expect(player.coordinates).toEqual(board.playerGrid[newCoords.x][newCoords.y].coordinates);
    });
    it("returns false because coordinates are not free", () => {
      board.placePlayer(firstCoords, player);
      const moveAttempt = board.move(firstCoords, player);
      expect(moveAttempt).toBeFalsy();
    });
    it.each(incorrectInputs)(
      "it will return false because due to inputs not being in the correct data shape, ",
      (coordinates: ICoordinates) => {
        console.log(coordinates);
        board.move(coordinates, player);
        expect(board.move(coordinates, player)).toBeFalsy();
      }
    );
  });
  describe("playerGrid", () => {
    beforeEach(() => {
      playerGrid = board.playerGrid;
    });
    it("returns player grid with one player placed on it", () => {
      expect(playerGrid).toBe(board.playerGrid);
    });
    it("contains a player in the returned array", () => {
      expect(playerGrid);
    });
  });
});
