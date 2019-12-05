import { HTTPHandler, HTTPEvent, HTTPResult } from "@ifit/fleece";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { IGameDAO } from "../dao/game-dao";
import { IPlayerDAO } from "../dao/player-dao";

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
  constructor(
    @inject(TYPES.IGameDAO) private gameDao: IGameDAO,
    @inject(TYPES.IPlayerDAO) private playerDao: IPlayerDAO
  ) {
    super();
  }
  public async run(event: IPutMovePlayerEvent): Promise<HTTPResult> {
    const { gameId } = event.processed.pathParameters;
    const { playerId } = event.processed.pathParameters;
    const { newX, newY } = event.processed.body;
    const newCordinates = { x: newX, y: newY };
    const game = this.gameDao.find(`${gameId}`);
    const player = this.playerDao.find(`${playerId}`);
    // const findPlayer method that use the similar syntax as what is in the board.ts so findIndex
    // need to figure out exactly what i want to accomplish here lol
    const findPlayer = function(game): boolean {
      if (game.board.move(newCordinates, player)) {
        return true;
      }
    };
    return findPlayer(game) ? HTTPResult.OK({ body: JSON.stringify(game) }) : HTTPResult.NotModified();
    //depending on if the .move is turthy or not we will return a succussful message or maybe a 500
    // more than just ok
    // look up other prototypes on httpresult
  }
}
