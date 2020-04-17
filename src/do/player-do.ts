import { IDataObject } from "@ifit/mongoose-dao";
import { IPlayer } from "../player";

export interface IPlayerDO extends IDataObject {
  player: IPlayer;
}
