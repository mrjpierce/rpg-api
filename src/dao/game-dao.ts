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
    return this.findGameById(foo.id);
  }
  async findGameById(id: string): Promise<Game> {
    console.log("id");
    console.log(id);

    return new Promise<Game>(async (resolve, reject) => {
      await this.model
        .findById(id)
        .populate({
          path: "board",
          populate: {
            path: "unitList"
          }
        })
        .exec((err, game) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(game);
          resolve(game.toObject());
        });
    });
  }
}
