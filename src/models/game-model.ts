import { Schema, model, Document, Model } from "mongoose";
import { initMongoCleanAndTimestamp } from "@ifit/mongoose-dao";
import { IGameDO } from "../do/game-do";

initMongoCleanAndTimestamp();

export type IGameDoc = IGameDO & Document;
export type IGameModel = Model<IGameDoc>;
export const modelName = "Game";

//todo:
//1. create board model and Data Object. Worry about DAO later
//2. what we are doing here in the game needs to be setup for board,
//3. put move handler reqs: should move unit, if unit is not found status code returned
//4. Create new handler that creates a game and a board and persists to the mongodb before the handler resolves. Endpoint returns gameId. Remeber going to use gameDAO.create

export const gameSchema = new Schema({
  board: { type: Schema.Types.ObjectId, ref: "Board" },
  units: [{ type: Schema.Types.ObjectId, ref: "Unit" }]
});

export function getGameModel(): IGameModel {
  try {
    return model<IGameDoc>(modelName);
  } catch {
    return model<IGameDoc>(modelName, gameSchema);
  }
}
