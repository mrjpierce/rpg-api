import "reflect-metadata";

import { injectable, inject } from "inversify";
import { HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IMongoService } from "../mongo-service";
import { BaseHandler } from "./base-handler";
import { IGameDO } from "../do/game-do";
import { IGameDAO } from "../dao/game-dao";

export interface IPostGameEvent extends HTTPEvent<IGameDO, null, null> {}

@injectable()
export class PostGameHandler extends BaseHandler<IGameDO, null, null> {
  constructor(
    @inject(TYPES.IGameDAO) private gameDAO: IGameDAO,
    @inject(TYPES.IMongoService) protected mongoService: IMongoService
  ) {
    super(mongoService, "PostUnitHandler");
  }

  public async run(event: IPostGameEvent): Promise<HTTPResult> {
    const newDoc = event.processed.body as IGameDO;
    const createdDoc = await this.gameDAO.create(newDoc);
    return HTTPResult.OK({ body: createdDoc });
  }
}
