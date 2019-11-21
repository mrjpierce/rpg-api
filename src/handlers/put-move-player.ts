import { HTTPHandler, HTTPEvent, HTTPResult } from "@ifit/fleece";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { IGameDAO } from "../dao/game-dao";

export interface IPutMovePlayerPath {
  gameId: string;
  playerId: string;
}

export interface IPutMovePlayerBody {
  newX: number;
  newY: number;
}

export interface IPutMovePlayerEvent extends HTTPEvent<IPutMovePlayerBody, IPutMovePlayerPath, null> {}

@injectable()
export class PutMovePlayerHandler extends HTTPHandler<IPutMovePlayerBody, IPutMovePlayerPath, null> {
  constructor(@inject(TYPES.IGameDAO) private gameDao: IGameDAO) {
    super();
  }
  public async run(event: IPutMovePlayerEvent): Promise<HTTPResult> {
    const { gameId } = event.processed.pathParameters;
    const { newX, newY } = event.processed.body;
    const game = this.gameDao.find(`${gameId}`);
    // const findPlayer method that use the similar syntax as what is in the board.ts so findIndex
    if (game.board.move(newX, newY, player)) {
    }
    return HTTPResult.OK({ body: JSON.stringify(game) });
    //depending on if the .move is turthy or not we will return a succussful message or maybe a 500
    // more than just ok
    // look up other prototypes on httpresult
  }
}
