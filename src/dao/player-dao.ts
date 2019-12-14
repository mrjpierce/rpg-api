import "reflect-metadata";
import { IPlayer } from "../player";
import { injectable } from "inversify";
import { store } from "./mock-store";

export interface IPlayerDAO {
  find(id: string): IPlayer;
}
@injectable()
export class PlayerDAO implements IPlayerDAO {
  find(id: string): IPlayer {
    const player = store.players[id] as IPlayer;
    if (!player) {
      throw new Error(`player id of ${id} does not exist`);
    }
    return player;
  }
}
