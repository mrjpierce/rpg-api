import { IDataObject } from "@ifit/mongoose-dao";
import { IUnit } from "../unit";

export interface IBoardDO extends IDataObject {
  gridSize: number;
  unitGrid: Array<Array<IUnit>>;
  unitList: Array<IUnit>;
}
