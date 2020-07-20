import "reflect-metadata";
import { Game } from "../game";
import { injectable, inject } from "inversify";
import { DataAccessObject } from "@ifit/mongoose-dao";
import { TYPES } from "../types";
import { IGameModel } from "../models/game-model";
import { IGameDO } from "../do/game-do";

export interface IGameDAO extends DataAccessObject<IGameDO, Game> {
  findGameById(id: string): Promise<IGameDO>;
  create(data: IGameDO): Promise<Game>;
}

@injectable()
export class GameDAO extends DataAccessObject<IGameDO, Game> implements IGameDAO {
  protected targetClass = Game;
  constructor(@inject(TYPES.IGameModel) protected model: IGameModel) {
    super();
  }
  async create(data: IGameDO): Promise<Game> {
    const foo = await super.create(data);
    console.log("foo console log");
    console.log(foo);
    return this.findGameById(foo.id);
  }
  async findGameById(id: string): Promise<Game> {
    // this needs to return a real instance of a game and the state
    const IGameDoc = await this.model
      // this sum bitch is undefined,
      .findById(id)
      .populate("board")
      .populate("unitGrid")
      .populate("unitList")
      .exec(err => {
        if (err) {
          console.log(err);
        }
      });
    console.log("findgamebyId console log");
    console.log(IGameDoc);
    return new Game(IGameDoc.toObject());
  }
}
