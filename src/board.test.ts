import Board from "./board";
import Player, { IPlayer, ICoordinates } from "./player";

describe("Board in ./board", () => {
  let board: Board;
  let player1: IPlayer;
  let player2: IPlayer;
  let playerGrid: ReadonlyArray<ReadonlyArray<IPlayer | null>>;
  let playerList: ReadonlyArray<IPlayer>;
  const gridSize = 3;
  const newCoords = { x: 0, y: 0 };
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
    it("creates an instance of the Board class", () => {
      expect(board).toBeInstanceOf(Board);
    });
  });
  describe.only("placePlayer", () => {
    it("updates the players coordinates with the new given coordinats", () => {
      board.placePlayer(orgCoords1, player1);
      board.placePlayer(newCoords, player1);
      expect(player1.coordinates.x === newCoords.x);
      expect(player1.coordinates.y === newCoords.y);
    });
    it("adds the player to the playerList", () => {
      const playerArr = [player1];
      board.placePlayer(orgCoords1, player1);
      expect(board.playerList).toEqual(expect.arrayContaining(playerArr));
    });
    it("throws error", () => {
      // correct thrown for gird position is not free
    });
    // player already exists on list on error
  });
  describe("move", () => {
    it("moves the player to the given coordinates cordinates", () => {
      board.placePlayer(orgCoords1, player1);
      board.move(newCoords, player1);
      expect(board.playerGrid[newCoords.x][newCoords.y]).toBe(player1);
    });
    it("removes player, changes player coord, places player and returns true", () => {
      board.placePlayer(orgCoords1, player1);
      expect(board.move(newCoords, player1)).toBeTruthy();
    });
    it("removes old coordinates and sets them to null", () => {
      board.placePlayer(orgCoords1, player1);
      board.move(newCoords, player1);
      expect(board.playerGrid[orgCoords1.x][orgCoords1.y]).toBe(null);
    });
    it("sets the moving players coordinates to the new give coordinates", () => {
      board.placePlayer(orgCoords1, player1);
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
      board.placePlayer(newCoords, player2);
      expect(() => board.isFree(newCoords)).toThrowError(/^Position is not free$/);
    });
  });
  describe("removePlayer", () => {
    it("removes old coordinates and sets them to null", () => {
      board.placePlayer(orgCoords1, player1);
      board.removePlayer(orgCoords1);
      expect(board.playerGrid[orgCoords1.x][orgCoords1.y]).toBe(null);
    });
    it("throws error when there is no player at the past in coordinates", () => {
      expect(() => board.removePlayer({ x: 0, y: 0 })).toThrowError(/No player at given coordinates/);
    });
    it("throws error because given coordiantes outside of board bounds", () => {
      expect(() => board.removePlayer({ x: 3, y: 0 })).toThrowError(
        /One of the given cooridnates is outside board bounds/
      );
    });
  });
  describe("gridLength", () => {
    it("returns an number of the grid length", () => {
      expect(board.gridLength).toEqual(gridSize);
    });
  });
  describe("playerGrid", () => {
    it("returns player grid with one player placed on it", () => {
      board.placePlayer(orgCoords1, player1);
      expect(playerGrid).toBe(board.playerGrid);
    });
  });
  describe("playerList", () => {
    it("returns a list of players on the board", () => {
      board.placePlayer(orgCoords1, player1);
      playerList = board.playerList;
      expect(playerList).toBe(board.playerList);
    });
  });
  describe("checkPlayerId", () => {
    beforeEach(() => {
      board.placePlayer(orgCoords1, player1);
    });
    it("returns true because id provided coresponds with an id of a player that exists on the playerList", () => {
      expect(board.checkPlayerList(player1.Id)).toBeTruthy();
    });
    it("returns false because id provided does not coresponds with an id of a player that exists on the playerList", () => {
      expect(board.checkPlayerList(3)).toBeFalsy();
    });
  });
});
