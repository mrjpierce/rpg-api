import { IDataObject } from "@ifit/mongoose-dao";
import { IBoard } from "../board";
import { IPlayer } from "../player";

export interface IGameDO extends IDataObject {
  board: IBoard;
  players: Array<IPlayer>;
}
