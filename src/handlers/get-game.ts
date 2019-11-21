import { HTTPHandler, HTTPEvent, HTTPResult } from "@ifit/fleece";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { IGameDAO } from "../dao/game-dao";

export interface IGetGameQuery {
  name?: string;
}

export interface IGetGamePath {
  id: string;
}

export interface IGetGameEvent extends HTTPEvent<null, IGetGamePath, IGetGameQuery> {}

@injectable()
export class GetGameHandler extends HTTPHandler<null, IGetGamePath, IGetGameQuery> {
  constructor(@inject(TYPES.IGameDAO) private gameDao: IGameDAO) {
    super();
  }
  public async run(event: IGetGameEvent): Promise<HTTPResult> {
    const { id } = event.processed.pathParameters;
    const game = this.gameDao.find(`${id}`);
    return HTTPResult.OK({ body: JSON.stringify(game) });
  }
}
