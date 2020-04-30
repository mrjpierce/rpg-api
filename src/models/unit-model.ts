import { Schema, model, Document, Model } from "mongoose";
import { initMongoCleanAndTimestamp } from "@ifit/mongoose-dao";
import { IUnitDO } from "../do/unit-do";

initMongoCleanAndTimestamp();

export type IUnitDoc = IUnitDO & Document;
export type IUnitModel = Model<IUnitDoc>;
export const modelName = "Unit";

export const unitSchema = new Schema({
  unit: { type: Schema.Types.ObjectId, ref: "Unit" }
});

export function getUnitModel(): IUnitModel {
  try {
    return model<IUnitDoc>(modelName);
  } catch {
    return model<IUnitDoc>(modelName, unitSchema);
  }
}
