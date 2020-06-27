import "reflect-metadata";

import { injectable, inject } from "inversify";
import { HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IUnitDAO } from "../dao/unit-dao";
import { IUnitDO } from "../do/unit-do";
import { IMongoService } from "../mongo-service";
import { BaseHandler } from "./base-handler";
import { IBoardDAO } from "../dao/board-dao";
import { IGameDAO } from "../dao/game-dao";
import { IBoardDO } from "../do/board-do";
import { IGameDO } from "../do/game-do";
import { Unit } from "../unit";

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

  //need: way to validate what we pass to the DAO
  // creating an unit without the board being aware of the position, need to figure out how to limit how units gets created

  public async run(event: IPostGameEvent): Promise<HTTPResult> {
    const newUnit = new Unit({ x: 0, y: 0 });

    newUnit.toDataObject();

    // not all these DataObjects are identical to the object classes them selves. For

    const newUnitCoords = { x: 0, y: 0 } as IUnitDO;
    const createdUnit = await this.unitDAO.create(newUnitCoords);
    const newBoardSize = event.processed.body as IBoardDO;
    const createdBoard = await this.boardDAO.create(newBoardSize);
    const newGame = { board: createdBoard } as IGameDO;
    const createdGame = await this.gameDAO.create(newGame);
    console.log(createdGame.id);
    await createdBoard.placeunit(createdUnit.coordinates, createdUnit);
    console.log(createdBoard);
    const gameDoc = await this.gameDAO.findById(createdGame.id);
    return HTTPResult.OK({ body: gameDoc });
    // get this to return result of the game.toDataObject
  }
}
