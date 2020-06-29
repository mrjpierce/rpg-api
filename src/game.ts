import { IGameDO, Packagable } from "./do/game-do";
import { IBoard } from "./board";

export interface IGame {
  id?: string;
  boardId: string;
  board?: IBoard;
}

export default class Game extends Packagable<IGameDO> implements IGame {
  public readonly _boardId: string;
  public readonly _id: string;

  public get id(): string {
    return this._id;
  }

  public get boardId(): string {
    return this._boardId;
  }

  constructor(init?: Partial<IGameDO>) {
    super();
    this._id = init.id;
    this._boardId = init.boardId;
  }
  public toDataObject(): IGameDO {
    return {
      id: this.id,
      boardId: this.boardId
    };
  }
}
