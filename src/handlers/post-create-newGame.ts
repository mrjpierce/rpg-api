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
import { Unit } from "../unit";
import { Board } from "../board";
import { Game } from "../game";

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

  public async run(): Promise<HTTPResult> {
    let unit1 = new Unit();
    let unit2 = new Unit();
    unit1 = await this.unitDAO.create(unit1.toDataObject());
    unit2 = await this.unitDAO.create(unit2.toDataObject());
    let board = new Board({ gridSize: 3 });
    board.placeUnit({ x: 0, y: 0 }, unit1);
    board.placeUnit({ x: 1, y: 1 }, unit2);
    unit1 = await this.unitDAO.update(unit1.toDataObject());
    unit2 = await this.unitDAO.update(unit2.toDataObject());
    board = await this.boardDAO.create(board.toDataObject());
    let game = new Game({ board });
    console.log(game);
    game = await this.gameDAO.create(game.toDataObject());

    return HTTPResult.OK({ body: game });
  }
}
/*

 */
