import "reflect-metadata";
import { Game } from "../game";
import { injectable, inject } from "inversify";
import { DataAccessObject } from "@ifit/mongoose-dao";
import { TYPES } from "../types";
import { IGameModel } from "../models/game-model";
import { IGameDO } from "../do/game-do";

export interface IGameDAO extends DataAccessObject<IGameDO, Game> {
  findGameById(id: string);
}

@injectable()
export class GameDAO extends DataAccessObject<IGameDO, Game> implements IGameDAO {
  protected targetClass = Game;
  constructor(@inject(TYPES.IGameModel) protected model: IGameModel) {
    super();
  }
  findGameById(id: string): Promise<IGameDO> {
    return this.model
      .findById(id)
      .populate("board")
      .populate("unitGrid")
      .populate("unitList")
      .exec((err, game) => {
        console.log(game);
        console.log(err);
      });
  }
}
