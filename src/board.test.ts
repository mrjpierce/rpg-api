import Board from "./board";
import Player, { IPlayer, ICoordinates } from "./player";

describe("Board in ./board", () => {
  let board: Board;
  let player1: IPlayer;
  let player2: IPlayer;
  let playerGrid: ReadonlyArray<ReadonlyArray<IPlayer | null>>;
  const gridSize = 3;
  const newCoords = { x: 1, y: 1 };
  const orgCoords1 = { x: 0, y: 1 };
  const orgCoords2 = { x: 2, y: 2 };
  const incorrectInputs: ICoordinates[] = [
    { x: "strang" as any, y: 0 },
    { x: Infinity, y: 0 }
  ];
  // when testing to see that it does throw an error pass the method call to the expect and then use .throws

  beforeEach(() => {
    player1 = Player.Build(0, orgCoords1);
    player2 = Player.Build(1, orgCoords2);
    board = new Board(gridSize);
  });
  describe("constructor", () => {
    it("should be an instance of Board", () => {
      expect(board).toBeInstanceOf(Board);
    });
  });
  describe("move", () => {
    it("removes player, changes player coord, places player and returns true", () => {
      board.move(newCoords, player1);
      expect(board.playerGrid[newCoords.x][newCoords.y]).toBe(player1);
    });
    it("removes player, changes player coord, places player and returns true", () => {
      expect(board.move(newCoords, player1)).toBeTruthy();
    });
    it("removes old coordinates and sets them to null", () => {
      board.move(newCoords, player1);
      expect(board.playerGrid[orgCoords1.x][orgCoords1.y]).toBe(null);
    });
    it("sets the moving players coordinates to the new give coordinates", () => {
      board.move(newCoords, player1);
      expect(player1.coordinates).toEqual(board.playerGrid[newCoords.x][newCoords.y].coordinates);
    });
    it.each(incorrectInputs)(
      "it will return false because due to inputs not being compatable",
      (coordinates: ICoordinates) => {
        board.move(coordinates, player1);
        expect(board.move(coordinates, player1)).toBeFalsy();
      }
    );
  });
  describe("isFree", () => {
    it("returns true because the grid is open on the 3D array", () => {
      expect(board.isFree(newCoords)).toBeTruthy();
    });
    it("should return the error that grid", () => {
      board.move(newCoords, player1);
      expect(() => board.move(newCoords, player2)).toThrowError(/Position is not free/);
    });
  });
  describe("gridLength", () => {
    it("returns an number of the grid length", () => {
      expect(board.gridLength).toEqual(gridSize);
    });
  });

  // write the throw tests and then move onto the implementation
  // expect(() => "call that i'm testing,"()).throws("use regex, utilizing /, this will ensure that the error we are getting is the one we want")
  // .throws use regex, which can be defiend with
  describe("playerGrid", () => {
    beforeEach(() => {
      playerGrid = board.playerGrid;
    });
    it("returns player grid with one player placed on it", () => {
      expect(playerGrid).toBe(board.playerGrid);
    });
    it("contains a player in the returned array", () => {
      // todo still need to
      expect(playerGrid);
    });
  });
});
