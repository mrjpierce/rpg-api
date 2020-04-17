import { IGameDO } from "./do/game-do";
import { DataObject } from "@ifit/mongoose-dao";
import { IPlayer } from "./player";
import { IBoard } from "./board";

export interface IGame {}

export default class Game extends DataObject<IGameDO> implements IGame {
  private board: IBoard;
  private players: Array<IPlayer>;

  constructor(init?: Partial<IGameDO>) {
    super(init);
  }
}
