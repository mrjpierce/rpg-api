import "reflect-metadata";

import { injectable, inject } from "inversify";
import { HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IUnitDAO } from "../dao/unit-dao";
import { IMongoService } from "../mongo-service";
import { BaseHandler } from "./base-handler";
import { IBoardDAO } from "../dao/board-dao";
import { IGameDAO } from "../dao/game-dao";
import { IBoardDO } from "../do/board-do";
// import { IGameDO } from "../do/game-do";
// import { Unit } from "../unit";
// import { Board } from "../board";

export interface IPostGameEvent extends HTTPEvent<IBoardDO, null, null> {}

@injectable()
export class PostNewGameHandler extends BaseHandler<IBoardDO, null, null> {
  constructor(
    @inject(TYPES.IUnitDAO) private unitDAO: IUnitDAO,
    @inject(TYPES.IBoardDAO) private boardDAO: IBoardDAO,
    @inject(TYPES.IGameDAO) private gameDAO: IGameDAO,
    @inject(TYPES.IMongoService) protected mongoService: IMongoService
  ) {
    super(mongoService, "PostGameHandler");
  }

  public async run(event: IPostGameEvent): Promise<HTTPResult> {
    // const newUnit = new Unit({ x: 0, y: 0 });
    // const newBoard = new Board({ gridSize: 3 });
    // newBoard.placeunit({ x: 1, y: 1 }, newUnit);
    // so the problem with doing it above is no ids, and the i'm understanding is that we need to create those in
    // mongo so we have the id's in order to move forward

    const createdUnit = await this.unitDAO.create({ x: 0, y: 0 });
    const newBoardSize = event.processed.body as IBoardDO;
    const createdBoard = await this.boardDAO.create(newBoardSize);
    await createdBoard.placeunit({ x: 1, y: 1 }, createdUnit);
    console.log(createdBoard.id);
    const createdGame = await this.gameDAO.create({ boardId: createdBoard.id });
    console.log(createdGame);
    // I know this is what we are trying to avoid creating 3 seperate docs one at a time but I'm not sure how to do the
    // multi populate thing in a way where we could populate the ids of units for the board and then board for the game
    return HTTPResult.OK({ body: createdGame });
  }
}
