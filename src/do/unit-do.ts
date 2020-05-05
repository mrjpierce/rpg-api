import { IDataObject } from "@ifit/mongoose-dao";

export interface IUnitDO extends IDataObject {
  _id: string;
  x: number;
  y: number;
}
