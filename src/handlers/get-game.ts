import "reflect-metadata";
import { injectable, inject } from "inversify";
import { HTTPHandler, HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IGameDAO } from "../dao/game-dao";

export interface IGetGameQuery {
  name?: string;
  id: string;
}

export interface IGetGamePath {}

export interface IGetGameEvent extends HTTPEvent<null, IGetGamePath, IGetGameQuery> {}

@injectable()
export class GetGameHandler extends HTTPHandler<null, IGetGamePath, IGetGameQuery> {
  constructor(@inject(TYPES.IGameDAO) private gameDao: IGameDAO) {
    super();
  }
  public async run(event: IGetGameEvent): Promise<HTTPResult> {
    const id = event.processed.queryStringParameters;
    console.log(id);
    const game = await this.gameDao.findGameById(id.id);
    return HTTPResult.OK({ body: game });
  }
}
/*

*/
