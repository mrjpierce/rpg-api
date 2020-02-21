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
    { x: 4, y: 0 },
    { x: 0, y: 3 },
    { x: 4, y: 4 }
  ];

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
    it("moves the player to the correct cordinates", () => {
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
    it("throws the error that grid position is not free", () => {
      board.move(newCoords, player1);
      expect(() => board.move(newCoords, player2)).toThrowError(/^Position is not free$/);
    });
  });
  describe.only("removePlayer", () => {
    it("removes old coordinates and sets them to null", () => {
      // need to keep the unit of test waaaayyy more specific and don't use more than we need
      // ARANGE
      board.placePlayer(orgCoords1, player1);

      // ACT
      board.removePlayer(orgCoords1);
      // very rarely should this act be more than one line and if the method being called is not the one in the describe than we have gone too far and need to limit what is being tested

      //ASSERT
      expect(board.playerGrid[orgCoords1.x][orgCoords1.y]).toBe(null);
    });
    // effect than cause
    it("throws error when there is no player at the past in coordinates", () => {
      expect(() => board.removePlayer({ x: 0, y: 0 })).toThrowError(/No player at given coordinates/);
    });
    it("throws error because given coordiantes outside of board bounds", () => {
      expect(() => board.removePlayer({ x: 3, y: 0 })).toThrowError(
        /One of the given cooridnates is outside board bounds/
      );
    });
    it.only("throws error because id provided did not correspeond with an id of a player on the board", () => {
      //ARRANGE
      board.placePlayer(orgCoords1, player1);
      board.playerList.pop();
      // A code smell would be if in the arrange there is a lot of convaluded bs
      //ACT
      // the playerlist and playergrid need to be inseperable,
      //ASSERT
      expect(() => board.removePlayer(orgCoords1)).toThrowError(
        /Provided id does not corespond with any id of the existing players/
      );
    });
  });
  describe("placePlayer", () => {
    it("updates the players coordinates with the new given coordinats", () => {
      //ARRANGE
      board.placePlayer(orgCoords1, player1);
      //ACT
      board.placePlayer(newCoords, player1);
      //ASSERT
      // split the expect, we can use more than one, should not have the && in
      expect(player1.coordinates.x === newCoords.x && player1.coordinates.y === newCoords.y);
    });
    it("adds the player to the playerList", () => {
      //ARRANGE
      const playerArr = [player1];
      //ACT
      board.placePlayer(orgCoords1, player1);
      //ASSERT
      expect(board.playerList).toEqual(expect.arrayContaining(playerArr));
    });
    it("throws an error because the coordinates did not update correctly", () => {
      // Black box, claim ignorance, in this
      //ARRANGE
      //ACT
      //ASSERT
      expect(() => board.placePlayer({ x: 1, y: "strang" as any }, player1)).toThrowError(
        /players coordinates did not update correctly/
      );
    });
  });
  describe("gridLength", () => {
    it("returns an number of the grid length", () => {
      expect(board.gridLength).toEqual(gridSize);
    });
  });
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
