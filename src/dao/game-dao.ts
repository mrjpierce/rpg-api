import Game, { IGame } from "../game";
import { injectable } from "inversify";
import Board from "../board";
import Player from "../player";

export interface IGameDAO {
  find(id: string): IGame;
}
@injectable()
export class GameDAO implements IGameDAO {
  constructor(){
    const board1 = new Board(3);
    const player1 = Player.Build(1, 0, 0);
    const player2 = Player.Build(2, 1, 0);

    this.games = [];
    this.games["0"]= new Game(board1, [player1, player2]);
  }
  /* ? */
  private games: IGame[];

  find(id: string): IGame{
    return this.games[id].board;
  }
  
}