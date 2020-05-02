import { Schema, model, Document, Model } from "mongoose";
import { initMongoCleanAndTimestamp } from "@ifit/mongoose-dao";
import { IUnitDO } from "../do/unit-do";

initMongoCleanAndTimestamp();

export type IUnitDoc = IUnitDO & Document;
export type IUnitModel = Model<IUnitDoc>;
export const modelName = "Unit";

export const unitSchema = new Schema({
  x: Number,
  y: Number
});

export function getUnitModel(): IUnitModel {
  console.log("getUnitModel");
  try {
    console.log("getUnitModel try");

    return model<IUnitDoc>(modelName);
  } catch {
    console.log("getUnitModel catch");
    console.log(model<IUnitDoc>(modelName, unitSchema));
    return model<IUnitDoc>(modelName, unitSchema);
  }
}
