import { IGame } from "../game";
import { injectable } from "inversify";
import { store } from "./mock-store";

export interface IGameDAO {
  find(id: string): IGame;
}
@injectable()
export class GameDAO implements IGameDAO {
  constructor(){
  }

  find(id: string): IGame{
    const game = store.games[id] as IGame;
    // the as keyword in TS is casting, just telling the complier to treat it as a certain data object
    if(!game){
      throw new Error(`game of ${id} does not exist`);
    }
    return game;
  }
  //error first or error early, 
  //chaining can 
}