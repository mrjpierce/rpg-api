import { IDataObject } from "@ifit/mongoose-dao";
import { IBoard } from "../board";

export interface IGameDO extends IDataObject {
  _id?: string;
  board: IBoard;
}

export abstract class Packagable<TDataObject> {
  public abstract toDataObject(): TDataObject;
}
