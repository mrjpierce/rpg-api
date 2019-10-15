import { IGame } from "../game";

export interface IGameDAO {
  find(id: string): IGame;

}
// data access object, takes care
// 
export class GameDAO implements IGameDAO {
  /* ? */
  private games: IGame[];

  find(id: string): IGame{
    return this.games[id];
  }
}
// make sure on master, branch off master, commit and make a PR