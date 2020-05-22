import "reflect-metadata";
import { injectable, inject } from "inversify";
import { IDataAccessObject, DataAccessObject } from "@ifit/mongoose-dao";
import { TYPES } from "../types";
import { IBoardModel } from "../models/board-model";
import { IBoardDO } from "../do/board-do";
import { IBoard, Board } from "../board";

export interface IBoardDAO extends IDataAccessObject<IBoardDO, IBoard> {}
@injectable()
export class BoardDAO extends DataAccessObject<IBoardDO, IBoard> implements IBoardDAO {
  protected targetClass = Board;
  constructor(@inject(TYPES.IBoardModel) protected model: IBoardModel) {
    super();
  }
}
