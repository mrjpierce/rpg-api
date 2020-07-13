import "reflect-metadata";
import { injectable, inject } from "inversify";
import { IDataAccessObject, DataAccessObject } from "@ifit/mongoose-dao";
import { TYPES } from "../types";
import { IBoardModel } from "../models/board-model";
import { IBoardDO } from "../do/board-do";
import { IBoard, Board } from "../board";

export interface IBoardDAO extends IDataAccessObject<IBoardDO, Board> {}
@injectable()
export class BoardDAO extends DataAccessObject<IBoardDO, Board> implements IBoardDAO {
  protected targetClass = Board;
  constructor(@inject(TYPES.IBoardModel) protected model: IBoardModel) {
    super();
  }
}
