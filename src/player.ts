import { injectable } from "inversify";
import "reflect-metadata";

export interface IUnit {
  Id: number;
}

export interface IPlayer extends IUnit {}

export interface IMonster extends IUnit {}

export interface ICoordinates {
  x: number;
  y: number;
}

export abstract class Unit implements IUnit {
  public readonly Id: number;
  protected coordinates: ICoordinates;

  public get coordinates(): ICoordinates {
    return {
      x: this._xPos,
      y: this._yPos
    };
  }

  public set coordinates(newCoordinates: ICoordinates) {
    this._xPos = newCoordinates.x;
    this._yPos = newCoordinates.y;
  }

  constructor(id: number, coordinates: ICoordinates) {
    this.Id = id;
    this.coordinates = coordinates;
  }
}

@injectable()
export default class Player extends Unit implements IPlayer {
  static Build(id: number, coordinates: ICoordinates): IPlayer {
    return new Player(id, coordinates);
  }

  protected constructor(id: number, coordinates: ICoordinates) {
    super(id, coordinates);
  }
}

@injectable()
export class Monster extends Unit implements IMonster {
  static Build(id: number, coordinates: ICoordinates): IPlayer {
    return new Monster(id, coordinates);
  }

  protected constructor(id: number, coordinates: ICoordinates) {
    super(id, coordinates);
  }
}
