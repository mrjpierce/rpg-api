import "reflect-metadata";
import { injectable, inject } from "inversify";
import { HTTPHandler, HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IGameDAO } from "../dao/game-dao";

export interface IGetGameQuery {
  name?: string;
  _id: any;
}

export interface IGetGamePath {}

export interface IGetGameEvent extends HTTPEvent<null, IGetGamePath, IGetGameQuery> {}

@injectable()
export class GetGameHandler extends HTTPHandler<null, IGetGamePath, IGetGameQuery> {
  constructor(@inject(TYPES.IGameDAO) private gameDao: IGameDAO) {
    super();
  }
  public async run(event: IGetGameEvent): Promise<HTTPResult> {
    // const id = event.processed.pathParameters;
    const id = event.processed.queryStringParameters;
    console.log(JSON.stringify(id));

    const game = await this.gameDao.findGameById(JSON.stringify(id));
    console.log(game);
    return HTTPResult.OK({ body: "hello wolrd" });
  }
}
/*
Help with:
1. game-model.ts - the way I was setting up the model was incorrect. I am using an array right now. How can I improve the schema
2. get-game - how can i better send the id? currently it looks like this when I send it {"":"5f1e3bb4c454ca9b52c779a3"}
3. this.model.findById() is still undefined and I can't get them sum bitch to work.
*/
