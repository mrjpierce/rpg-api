import Board from "../board";
import Player from "../player";
import Game from "../game";

const board0 = new Board(3);
const player0 = Player.Build(0, { x: 0, y: 0 });
const player1 = Player.Build(1, { x: 1, y: 0 });
const game0 = new Game(board0, [player0, player1]);

export const store = {
  games: {
    "0": game0
  },
  boards: {
    "0": board0
  },
  players: {
    "0": player0,
    "1": player1
  }
};
