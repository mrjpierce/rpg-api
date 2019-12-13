import "reflect-metadata";
import { IGame } from "../game";
import { injectable } from "inversify";
import { store } from "./mock-store";
import { DataAccessObject, IDataObject } from "@ifit/mongoose-dao";

export interface IGameDAO {
  find(id: string): IGame;
}

// export class GameDAO implements IGameDAO {
//   find(id: string): IGame {
//     const game = store.games[id] as IGame;
//     if (!game) {
//       throw new Error(`game of ${id} does not exist`);
//     }
//     return game;
//   }
// }
export interface IGameDO {
  //DO is the data object which serves the DAO
}
@injectable()
export interface IGameDAO<IGameDO, IGame> extends DataAccessObject<IGameDO, IGame> {
  // good way to think about a data store is think
  //hydration/dehydration:
  find(id: string): Promise<IGameDO>;
}
export class GameDAO<IGameDO, IGame> extends DataAccessObject<IGameDO, IGame> implements IGameDAO<IGameDO, IGame> {
  async find(id: string): Promise<IGameDO> {}
  //async territory
}
// todo get tests back upto date and do async and await study
