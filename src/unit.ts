import "reflect-metadata";
import { IUnitDO } from "./do/unit-do";

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IUnit {
  coordinates: ICoordinates;
  _id?: string;
}

export class Unit implements IUnit {
  public readonly _id: string;
  private _x: number;
  private _y: number;

  public get coordinates(): ICoordinates {
    return {
      x: this._x,
      y: this._y
    };
  }

  public set coordinates(newCoordinates: ICoordinates) {
    this._x = newCoordinates.x;
    this._y = newCoordinates.y;
  }

  constructor(init?: Partial<IUnitDO>) {
    this._id = init.id;
    this._x = init.x;
    this._y = init.y;
  }
}
