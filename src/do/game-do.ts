import { IDataObject } from "@ifit/mongoose-dao";
import { IBoard } from "../board";
import { IUnit } from "../unit";

export interface IGameDO extends IDataObject {
  _id: string;
  board: IBoard;
  units: Array<IUnit>;
}
