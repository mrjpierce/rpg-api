import { Schema, model, Document, Model } from "mongoose";
import { initMongoCleanAndTimestamp } from "@ifit/mongoose-dao";
import { IBoardDO } from "../do/board-do";

initMongoCleanAndTimestamp();

export type IBoardDoc = IBoardDO & Document;
export type IBoardModel = Model<IBoardDoc>;
export const modelName = "Board";

export const boardSchema = new Schema({
  gridSize: Number,
  terrianGrid: Array,
  unitList: [{ type: Schema.Types.ObjectId, ref: "Unit" }]
});

export function getBoardModel(): IBoardModel {
  try {
    return model<IBoardDoc>(modelName);
  } catch {
    return model<IBoardDoc>(modelName, boardSchema);
  }
}
