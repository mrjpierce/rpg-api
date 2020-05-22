import { IGameDO } from "./do/game-do";
import { DataObject } from "@ifit/mongoose-dao";
import { IBoard } from "./board";
import { IUnit } from "./unit";

export interface IGame {
  id?: string;
  board: IBoard;
  units: Array<IUnit>;
}

export default class Game extends DataObject<IGameDO> implements IGame {
  private _board: IBoard;
  units: Array<IUnit>;
  //game holds a reference to the board and units,

  public get board(): IBoard {
    return this._board;
  }

  public get unitList(): Array<IUnit> {
    return this.units;
  }

  constructor(init?: Partial<IGameDO>) {
    super(init);
    this._board = init.board;
    this.units = init.units;
  }
}
