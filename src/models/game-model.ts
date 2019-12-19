import { Schema, model } from "mongoose";

export const gameSchema = new Schema({
  board: { type: Schema.Types.ObjectId, ref: "Board" },
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }]
});

export function getGameModel(): IGameModel {
  try {
    return model<IGameDoc>("Game");
  } catch (err) {
    return model<IGameDoc>("Game", gameSchema);
  }
}
// work on test for at least one class
