import "reflect-metadata";
import { Lambdafy } from "@ifit/fleece";
import { ContainerFactory } from "./container-factory";
import { GetGameHandler } from "./handlers/get-game";
import { PutMovePlayerHandler } from "./handlers/put-move-player";

const containerFactory = new ContainerFactory();

// const board = container.get<IBoard>(TYPES.IBoard);
// const playerBuilder = container.get<PlayerBuildFuncType>(TYPES.IPlayerBuilder);

const lambdafy = (identifier: any) => Lambdafy.create(containerFactory, identifier);
// lambadfy wraps the handler in function for scoping
export const getGameLambda = lambdafy(GetGameHandler);
export const putMovePlayerLambda = lambdafy(PutMovePlayerHandler);
