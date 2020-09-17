import "reflect-metadata";
import { injectable, inject } from "inversify";
import { HTTPHandler, HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IGameDAO } from "../dao/game-dao";
import { IUnitDAO } from "../dao/unit-dao";

export interface IPutMoveUnitPath {
  gameId: string;
  unitId: string;
}

export interface IPutMoveUnitBody {
  newX: number;
  newY: number;
}

export interface IPutMoveUnitEvent extends HTTPEvent<IPutMoveUnitBody, IPutMoveUnitPath, null> {}

@injectable()
export class PutMoveunitHandler extends HTTPHandler<IPutMoveUnitBody, IPutMoveUnitPath, null> {
  constructor(@inject(TYPES.IGameDAO) private gameDao: IGameDAO, @inject(TYPES.IUnitDAO) private unitDao: IUnitDAO) {
    super();
  }
  public async run(event: IPutMoveUnitEvent): Promise<HTTPResult> {
    const { gameId } = event.processed.pathParameters;
    const { unitId } = event.processed.pathParameters;
    const { newX, newY } = event.processed.body;
    const newCordinates = { x: newX, y: newY };
    const game = await this.gameDao.findById(`${gameId}`);
    const unit = await this.unitDao.findById(`${unitId}`);

    const moveunit = function(): boolean {
      if (game.board.move(newCordinates, unit)) {
        return true;
      }
      return false;
    };

    return moveunit() ? HTTPResult.OK({ body: {} }) : HTTPResult.NotModified();
  }
}
