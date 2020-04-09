import "reflect-metadata";

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IUnit {
  Id: number;
  coordinates: ICoordinates;
}

export abstract class Unit implements IUnit {
  public readonly Id: number;
  protected _xPos: number;
  protected _yPos: number;

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
    this._xPos = coordinates.x;
    this._yPos = coordinates.y;
  }
}
