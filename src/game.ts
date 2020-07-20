import { IGameDO, Packagable } from "./do/game-do";
import { IBoard } from "./board";

export interface IGame {
  id?: string;
  board?: IBoard;
}

export class Game extends Packagable<IGameDO> implements IGame {
  public readonly board: IBoard;
  public readonly id: string;

  constructor(init?: Partial<IGameDO>) {
    super();
    console.log("init console log");
    console.log(init);
    this.id = init?.id;
    this.board = init?.board;
  }

  public toDataObject(): IGameDO {
    return {
      id: this.id,
      board: this.board
    };
  }
}
