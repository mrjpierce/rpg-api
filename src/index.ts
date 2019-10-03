import { Lambdafy } from "@ifit/fleece";
import { ContainerFactory } from "./container-factory";

const containerFactory = new ContainerFactory();


// const board = container.get<IBoard>(TYPES.IBoard);
// const playerBuilder = container.get<PlayerBuildFuncType>(TYPES.IPlayerBuilder);

// const player1 = playerBuilder(1, 1, 1, board);
// const player2 = playerBuilder(2, 1, 2, board);

const lambdafy = (identifier: any) => Lambdafy.create(containerFactory, identifier);

export const getGameLambda = lambdafy(/* ? */);
