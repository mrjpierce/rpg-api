import Game from "./game";
import Player, { IPlayer } from "./player";
import Board from "./board";

describe("constructor", () => {
  let instance: Game;
  let boardInstance: Board;
  let playerInstanceOne: IPlayer;
  let playerInstanceTwo: IPlayer;

  beforeEach(() => {
    boardInstance = new Board(3);
    playerInstanceOne = Player.Build(1, { x: 0, y: 0 });
    playerInstanceTwo = Player.Build(2, { x: 0, y: 1 });
    instance = new Game(boardInstance, [playerInstanceOne, playerInstanceTwo]);
  });
  it("should be an instance of BoardCreation", () => {
    expect(instance).toBeInstanceOf(Game);
  });
  it.only("places both players on the board", () => {
    expect(boardInstance.playerList).toContain(playerInstanceOne);
    expect(boardInstance.playerList).toContain(playerInstanceTwo);
  });
});
