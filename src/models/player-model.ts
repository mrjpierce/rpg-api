import { Schema, model, Document, Model } from "mongoose";
import { initMongoCleanAndTimestamp } from "@ifit/mongoose-dao";
import { IPlayerDO } from "../do/player-do";

initMongoCleanAndTimestamp();

export type IPlayerDoc = IPlayerDO & Document;
export type IPlayerModel = Model<IPlayerDoc>;
export const modelName = "Player";

export const playerSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: "Player" }
});

export function getPlayerModel(): IPlayerModel {
  try {
    return model<IPlayerDoc>(modelName);
  } catch {
    return model<IPlayerDoc>(modelName, playerSchema);
  }
}
