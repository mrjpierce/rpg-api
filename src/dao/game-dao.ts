import "reflect-metadata";
import { IGame } from "../game";
import { injectable } from "inversify";
import { store } from "./mock-store";

export interface IGameDAO {
  find(id: string): IGame;
}
@injectable()
export class GameDAO implements IGameDAO {
  find(id: string): IGame {
    const game = store.games[id] as IGame;
    if (!game) {
      throw new Error(`game of ${id} does not exist`);
    }
    return game;
  }
}
