import { IDataObject } from "@ifit/mongoose-dao";

export interface IGameDO extends IDataObject {
  id?: string;
  boardId: string;
}

export abstract class Packagable<TDataObject> {
  public abstract toDataObject(): TDataObject;
}
