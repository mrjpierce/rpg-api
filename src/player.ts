import "reflect-metadata";
import { injectable } from "inversify";
import { IUnit, ICoordinates, Unit } from "./unit";
import { DataObject } from "@ifit/mongoose-dao";
import { IPlayerDO } from "./do/player-do";

export interface IPlayer extends IUnit, DataObject<IPlayerDO> {}
//does each unit type need a seperate data store?

@injectable()
export default class Player extends Unit implements IPlayer {
  static Build(id: number, coordinates: ICoordinates): IPlayer {
    return new Player(id, coordinates);
  }

  protected constructor(id: number, coordinates: ICoordinates) {
    super(id, coordinates);
  }
}
