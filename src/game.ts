import { IPlayer } from "./player";
import { IBoard } from "./board";

export interface IGame {
  // board?: IBoard;
  // need to do something similar to where we use read onlys
}
export default class Game {
  constructor(private board: IBoard, private players: IPlayer[]) {
    this.players.forEach(player => {
      this.board.placePlayer(player.coordinates, player);
    });
  }
}
