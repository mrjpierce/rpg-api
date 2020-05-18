import "reflect-metadata";
import Game, { IGame } from "../game";
import { injectable, inject } from "inversify";
import { DataAccessObject } from "@ifit/mongoose-dao";
import { TYPES } from "../types";
import { IGameModel } from "../models/game-model";
import { IGameDO } from "../do/game-do";

export interface IGameDAO extends DataAccessObject<IGameDO, IGame> {}

@injectable()
export class GameDAO extends DataAccessObject<IGameDO, IGame> implements IGameDAO {
  protected targetClass = Game;
  constructor(@inject(TYPES.IGameModel) protected model: IGameModel) {
    super();
  }
}
