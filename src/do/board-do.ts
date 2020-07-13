import { IDataObject } from "@ifit/mongoose-dao";
import { IUnit } from "../unit";
import { ITerrain } from "../terrain";

export interface IBoardDO extends IDataObject {
  id?: string;
  gridSize: number;
  terrainGrid: Array<Array<ITerrain>>;
  unitList: Array<IUnit>;
}
