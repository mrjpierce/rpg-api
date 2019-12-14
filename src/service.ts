import "reflect-metadata";
import { inject, injectable } from "inversify";
import Board from "./board";
import Player from "./player";

@injectable()
export class Service {
  protected board: Board;
  protected player1: Player;
  protected player2: Player;

  constructor(@inject(Board) board: Board, @inject(Player) player1: Player, @inject(Player) player2: Player) {
    this.board = board;
    this.player1 = player1;
    this.player2 = player2;
    const firstService = new Service(this.board, this.player1, this.player2);

    console.log(firstService);
  }
}
