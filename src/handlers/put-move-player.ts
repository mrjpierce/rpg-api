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
    // Goals for meeting: 1. figure out the best way to handle the http results / using fleece 2. Go over how to setup the Put endpoint in serverless
    const movePlayer = function(game): boolean {
      if (game.board.move(newCordinates, player)) {
        return true;
      }
    };

    return movePlayer(game) ? HTTPResult.OK({ body: JSON.stringify(game) }) : HTTPResult.NotModified();

    // const findPlayer = (game: IGame) => {
    //   game.board.move(newCordinates, player) ? HTTPResult.OK({ body: JSON.stringify(game) }) : HTTPResult.NotModified();
    // };
    // return findPlayer(game);
  }
}
