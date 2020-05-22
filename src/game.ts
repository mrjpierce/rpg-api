import { IGameDO } from "./do/game-do";
import { DataObject } from "@ifit/mongoose-dao";
import { IUnit } from "./unit";
import { IBoard } from "./board";

export interface IGame {}

export default class Game extends DataObject<IGameDO> implements IGame {
  private board: IBoard;
  private units: Array<IUnit>;
  //game holds a reference to the board and units,

  constructor(init?: Partial<IGameDO>) {
    super(init);
  }
}
