import { Schema, model, Document, Model } from "mongoose";
import { initMongoCleanAndTimestamp } from "@ifit/mongoose-dao";
import { IGameDO } from "../do/game-do";

initMongoCleanAndTimestamp();

export type IGameDoc = IGameDO & Document;
export type IGameModel = Model<IGameDoc>;
export const modelName = "Game";

export const gameSchema = new Schema({
  boardId: String
});

export function getGameModel(): IGameModel {
  try {
    return model<IGameDoc>(modelName);
  } catch {
    return model<IGameDoc>(modelName, gameSchema);
  }
}
