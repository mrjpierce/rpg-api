import initDIContainer from "./di-container";
import { IBoard } from "./board";
import { PlayerBuildFuncType } from "./player";
import { TYPES } from "../out/di-container";

const container = initDIContainer();

const board = container.get<IBoard>(TYPES.IBoard);
const playerBuilder = container.get<PlayerBuildFuncType>(TYPES.IPlayerBuilder);

const player1 = playerBuilder(1, 1, 1, board);
const player2 = playerBuilder(2, 1, 2, board);

