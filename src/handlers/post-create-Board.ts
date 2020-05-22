import "reflect-metadata";

import { injectable, inject } from "inversify";
import { HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IMongoService } from "../mongo-service";
import { BaseHandler } from "./base-handler";
import { IBoardDAO } from "../dao/board-dao";
import { IBoardDO } from "../do/board-do";

export interface IPostBoardEvent extends HTTPEvent<IBoardDO, null, null> {}

@injectable()
export class PostBoardHandler extends BaseHandler<IBoardDO, null, null> {
  constructor(
    @inject(TYPES.IBoardDAO) private boardDAO: IBoardDAO,
    @inject(TYPES.IMongoService) protected mongoService: IMongoService
  ) {
    super(mongoService, "PostBoardHandler");
    console.log(boardDAO);
  }

  public async run(event: IPostBoardEvent): Promise<HTTPResult> {
    const newDoc = event.processed.body as IBoardDO;
    const createdDoc = await this.boardDAO.create(newDoc);
    return HTTPResult.OK({ body: createdDoc });
  }
}
