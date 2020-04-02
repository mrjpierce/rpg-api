import Board from "./board";
import Player, { IPlayer, ICoordinates } from "./player";

describe("Board in ./board", () => {
  let board: Board;
  let player1: IPlayer;
  let player2: IPlayer;
  let playerGrid: ReadonlyArray<ReadonlyArray<IPlayer | null>>;
  let playerListTest: ReadonlyArray<IPlayer>;
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
  describe("playerGrid", () => {
    it("returns player grid with one player placed on it", () => {
      board.placePlayer(orgCoords1, player1);
      playerGrid = board.playerGrid;
      expect(playerGrid).toBe(board.playerGrid);
    });
  });
  describe("playerList", () => {
    it("returns a list of players on the board", () => {
      board.placePlayer(newCoords, player1);
      playerListTest = board.playerList;
      expect(playerListTest).toBe(board.playerList);
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
  describe("checkPlayerList", () => {
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
  describe("playerAtCoordinates", () => {
    it("returns a player because the given coordinates are of a player on the board", () => {
      board.placePlayer(orgCoords2, player2);
      expect(board.playerAtCoordinates(orgCoords2)).toMatchObject(player2);
    });
    it("Error is thrown because there is no player at provided coordinates ", () => {
      expect(() => board.playerAtCoordinates(newCoords)).toThrowError(/No player at given coordinates/);
    });
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
    it("returns falsey because given coordinate grid position is not free", () => {
      board.placePlayer(newCoords, player2);
      expect(() => board.isFree(newCoords)).toBeFalsy;
    });
  });
  describe("removePlayer", () => {
    it("removes old coordinates and sets them to null", () => {
      board.placePlayer(orgCoords1, player1);
      board.removePlayer(player1);
      expect(board.playerGrid[orgCoords1.x][orgCoords1.y]).toBe(null);
    });
    it("throws error when the provided player is not on either gird or list", () => {
      expect(() => board.removePlayer(player2)).toThrowError(/Provided player is not on/);
    });
    it("throws error when the provided player is not on either gird or list", () => {
      board.placePlayer(orgCoords1, player1);
      const fooPlayer = Player.Build(player1.Id, player1.coordinates);
      expect(() => board.removePlayer(fooPlayer)).toThrowError(
        /Player id mismatch; Player passed does not match the player with corresponding id on board/
      );
    });
  });
  describe("placePlayer", () => {
    it("updates the players coordinates with the new given coordinats", () => {
      board.placePlayer(newCoords, player1);
      expect(player1.coordinates.x === newCoords.x);
      expect(player1.coordinates.y === newCoords.y);
    });
    it("adds the player to the playerList", () => {
      const playerArr = [player1];
      board.placePlayer(orgCoords1, player1);
      expect(board.playerList).toEqual(expect.arrayContaining(playerArr));
    });
    it("throws error that player cannot be placed because given coordinates are not valid", () => {
      expect(() => board.placePlayer(incorrectInputs[1], player1)).toThrowError(/^Player cannot be placed$/);
    });
    it("throws error that position is not free", () => {
      board.placePlayer(orgCoords1, player2);
      expect(() => board.placePlayer(orgCoords1, player1)).toThrowError(/^Position is not free$/);
    });
    it("throws error that player is already on list", () => {
      board.placePlayer(orgCoords1, player2);
      expect(() => board.placePlayer(newCoords, player2)).toThrowError(/^Player already exists on list$/);
    });
    it("player is added to the player grid array correctly", () => {
      const playerArr = [player2];
      board.placePlayer(orgCoords1, player2);
      expect(board.playerGrid[player2.coordinates.x]).toEqual(expect.arrayContaining(playerArr));
    });
  });
});
