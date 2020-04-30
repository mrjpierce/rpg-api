import { IDataObject } from "@ifit/mongoose-dao";
import { IBoard } from "../board";
import { IUnit } from "../unit";

export interface IGameDO extends IDataObject {
  board: IBoard;
  units: Array<IUnit>;
}
