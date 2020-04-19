import Board from "../board";
import unit from "../unit";
import Game from "../game";

const board0 = new Board(3);
const unit0 = unit.Build(0, { x: 0, y: 0 });
const unit1 = unit.Build(1, { x: 2, y: 0 });
const game0 = new Game(board0, [unit0, unit1]);
console.log("hey es me mock store");
export const store = {
  games: {
    "0": game0
  },
  boards: {
    "0": board0
  },
  units: {
    "0": unit0,
    "1": unit1
  }
};
