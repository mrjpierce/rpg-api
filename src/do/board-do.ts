import { IDataObject } from "@ifit/mongoose-dao";
import { IUnit } from "../unit";
import { ITerrain } from "../terrain";

export interface IBoardDO extends IDataObject {
  id?: string;
  gridSize: number;
  unitGrid: ReadonlyArray<ReadonlyArray<IUnit | null>>;
  terrainGrid: Array<Array<ITerrain>>;
  unitList: ReadonlyArray<IUnit>;
}
