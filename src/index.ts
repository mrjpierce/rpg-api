import "reflect-metadata";
import { Lambdafy } from "@ifit/fleece";
import { ContainerFactory } from "./container-factory";
import { GetGameHandler } from "./handlers/get-game";
import { PutMoveunitHandler } from "./handlers/put-move-Unit";
import { PostUnitHandler } from "./handlers/post-create-Unit";
import { PostBoardHandler } from "./handlers/post-create-Board";
import { PostNewGameHandler } from "./handlers/post-create-newGame";

const containerFactory = new ContainerFactory();

// const board = container.get<IBoard>(TYPES.IBoard);
// const unitBuilder = container.get<unitBuildFuncType>(TYPES.IunitBuilder);

const lambdafy = (identifier: any) => Lambdafy.create(containerFactory, identifier);
// lambadfy wraps the handler in function for scoping
export const getGameLambda = lambdafy(GetGameHandler);
export const putMoveunitLambda = lambdafy(PutMoveunitHandler);
export const postUnitLambda = lambdafy(PostUnitHandler);
export const postBoardLambda = lambdafy(PostBoardHandler);
export const postNewGameLambda = lambdafy(PostNewGameHandler);
