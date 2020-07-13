import { IGameDO, Packagable } from "./do/game-do";
import { IBoard } from "./board";

export interface IGame {
  id?: string;
  board?: IBoard;
}

export class Game extends Packagable<IGameDO> implements IGame {
  public readonly _board: IBoard;
  public readonly _id: string;

  public get id(): string {
    return this._id;
  }

  public get board(): IBoard {
    return this._board;
  }

  constructor(init?: Partial<IGameDO>) {
    super();
    this._id = init?.id;
    this._board = init?.board;
  }

  public toDataObject(): IGameDO {
    return {
      id: this.id,
      board: this.board
    };
  }
}
