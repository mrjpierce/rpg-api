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
    const movePlayer = function(): boolean {
      if (game.board.move(newCordinates, player)) {
        return true;
      }
      return false;
    };

    return movePlayer() ? HTTPResult.OK({ body: {} }) : HTTPResult.NotModified();
  }
}
