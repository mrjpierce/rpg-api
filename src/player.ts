import "reflect-metadata";
import { injectable } from "inversify";
import { IUnit, ICoordinates, Unit } from "./unit";

export interface IPlayer extends IUnit {}

@injectable()
export default class Player extends Unit implements IPlayer {
  static Build(id: number, coordinates: ICoordinates): IPlayer {
    return new Player(id, coordinates);
  }

  protected constructor(id: number, coordinates: ICoordinates) {
    super(id, coordinates);
  }
}
