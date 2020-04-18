import { IDataObject } from "@ifit/mongoose-dao";
import { IUnit } from "../unit";

//switch all names from player to unit delete unessecary files
//being more delibrate with work ie defining branches more delibrate, commits more delibrate, creating prs delibrate
//create branch for boardDO and get setup

export interface IUnitDO extends IDataObject {
  x: number;
  y: number;
}
