import { Container } from 'inversify';
import Board, { IBoard } from './board';
import Player, { IPlayer, PlayerBuildFuncType } from './player';

export const TYPES = {
  "IBoard": Symbol("IBoard"),
  "IPlayerBuilder": Symbol("IPlayerBuilder"),
};

export default function initGame(): Container {
  const diContainer = new Container();

  const board = new Board(3);
  diContainer.bind<IBoard>(TYPES.IBoard).toConstantValue(board);
  diContainer.bind<PlayerBuildFuncType>(TYPES.IPlayerBuilder).toConstantValue((id: number, xPos: number, yPos: number, board: IBoard) => Player.Build(id, xPos, yPos, board));

  return diContainer;
}
