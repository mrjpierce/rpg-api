import "reflect-metadata";

import { injectable, inject } from "inversify";
import { HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IMongoService } from "../mongo-service";
import { BaseHandler } from "./base-handler";
import { IGameDO } from "../do/game-do";
import { IGameDAO } from "../dao/game-dao";

export interface IPostGameEvent extends HTTPEvent<IGameDO, null, null> {}
//needs get newGameHandler, won't take any url or body but will have a bearer token in the header that is the users
//newGameHanlder will handle all the creation of broad and unit
// bearer token in header not body
// will save everything and for now send back the gameId of the newcreated game that is saved in the db
//game will return id of the board, then using that board id and using that to query to get players
//way to athenticate user, bearer token, in 3t create a user with a bearer token that we can query off of
//need a way to send info to our client so they can handle it nicely, core package with all our types
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
