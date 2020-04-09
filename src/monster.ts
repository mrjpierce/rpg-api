import "reflect-metadata";
import { injectable } from "inversify";
import { IUnit, ICoordinates, Unit } from "./unit";

export interface IMonster extends IUnit {}
@injectable()
export class Monster extends Unit implements IMonster {
  static Build(id: number, coordinates: ICoordinates): IMonster {
    return new Monster(id, coordinates);
  }

  protected constructor(id: number, coordinates: ICoordinates) {
    super(id, coordinates);
  }
}
