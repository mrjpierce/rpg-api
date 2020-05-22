import { IDataObject } from "@ifit/mongoose-dao";
import { IUnit } from "../unit";

export interface IBoardDO extends IDataObject {
  unitGrid: Array<Array<IUnit>>;
  unitList: Array<IUnit>;
}
