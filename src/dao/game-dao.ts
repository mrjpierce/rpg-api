import "reflect-metadata";
import Game, { IGame } from "../game";
import { injectable, inject } from "inversify";
import { store } from "./mock-store";

import { DataAccessObject, IDataObject } from "@ifit/mongoose-dao";
import { types } from "@babel/core";
import { TYPES } from "../types";

// export interface IGameDAO {
//   find(id: string): IGame;
// }

// export class GameDAO implements IGameDAO {
//   find(id: string): IGame {
//     const game = store.games[id] as IGame;
//     if (!game) {
//       throw new Error(`game of ${id} does not exist`);
//     }
//     return game;
//   }
// }
export interface IGameDO extends IDataObject {
  //DO is the data object which serves the DAO
}

@injectable()
export interface IGameDAO<IGameDO, IGame> extends DataAccessObject<IGameDO, IGame> {}
export class GameDAO<IGameDO, IGame> extends DataAccessObject<IGameDO, IGame> implements IGameDAO<IGameDO, IGame> {
  constructor(@inject(TYPES.IGameModel) protected gameModel: IGameModel) {
    super();
    // we are men and men use semicolens;
  }
}
