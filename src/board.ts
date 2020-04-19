import "reflect-metadata";
import { injectable } from "inversify";
import { Iunit } from "./unit";
import { ICoordinates } from "./unit";
import { ITerrain } from "./terrain";

export interface IBoard {
  isFree(coordinates: ICoordinates): boolean;
  removeunit(unit: Iunit): void;
  placeunit(coordinates: ICoordinates, unit: Iunit): void;
  move(newCoordinates: ICoordinates, unit: Iunit): boolean;
  unitGrid: ReadonlyArray<ReadonlyArray<Iunit | null>>;
  unitList: ReadonlyArray<Iunit>;
  checkunitList(id: number): boolean;
  unitAtCoordinates(cooordinates: ICoordinates): Iunit;
}

@injectable()
export default class Board implements IBoard {
  private _unitGrid: Array<Array<Iunit | null>>;
  private _terrainGrid: Array<Array<ITerrain>>;
  private _unitList: Array<Iunit>;

  public get unitGrid(): ReadonlyArray<ReadonlyArray<Iunit | null>> {
    return this._unitGrid;
  }
  public get unitList(): ReadonlyArray<Iunit> {
    return this._unitList;
  }
  public get gridLength(): number {
    return this.unitGrid.length;
  }
  constructor(gridSize: number) {
    this._unitList = new Array<Iunit>();
    this._terrainGrid = new Array<Array<ITerrain>>(gridSize);
    this._unitGrid = new Array<Array<Iunit>>(gridSize);
    for (let i = 0; i < this._unitGrid.length; i++) {
      this._unitGrid[i] = new Array<Iunit>(gridSize);
      this._terrainGrid[i] = new Array<ITerrain>(gridSize);
    }
  }
  public checkunitList(id: number): boolean {
    const idBeingChecked = this._unitList.findIndex(unit => unit.Id === id);
    if (idBeingChecked === -1) {
      return false;
    }
    return true;
  }
  public unitAtCoordinates(coordiantes: ICoordinates): Iunit {
    if (!this.coordinateValidator(coordiantes)) {
      throw new Error("Given coordinates are not compatable");
    }
    if (this._unitGrid[coordiantes.x][coordiantes.y] == null || undefined) {
      throw new Error("No unit at given coordinates");
    } else return this._unitGrid[coordiantes.x][coordiantes.y];
  }
  private coordinateValidator(coordiantes: ICoordinates): boolean {
    if (!isFinite(coordiantes.x || coordiantes.y)) {
      return false;
    }
    if (coordiantes.x > this.gridLength - 1 || coordiantes.y > this.gridLength - 1) {
      return false;
    }
    return true;
  }
  public move(newCooridnates: ICoordinates, unit: Iunit): boolean {
    if (!this.isFree(newCooridnates)) {
      return false;
    }
    this.removeunit(unit);
    this.placeunit(newCooridnates, unit);
    return true;
  }
  public isFree(newCoordinates: ICoordinates): boolean {
    if (!this.coordinateValidator(newCoordinates)) {
      return false;
    }
    if (
      this._unitGrid[newCoordinates.x][newCoordinates.y] != null ||
      this._unitGrid[newCoordinates.x][newCoordinates.y] != undefined
    ) {
      return false;
    }
    return true;
  }
  public removeunit(unitToBeRemoved: Iunit): void {
    const unitOnList = this._unitList.find(unit => unit.Id === unitToBeRemoved.Id);
    const unitOnGrid = this._unitGrid[unitToBeRemoved.coordinates.x][unitToBeRemoved.coordinates.y];
    if (unitOnGrid === undefined || unitOnList === undefined) {
      throw new Error("Provided unit is not on grid or list");
    }
    if (unitToBeRemoved !== unitOnList) {
      throw new Error("unit id mismatch; unit passed does not match the unit with corresponding id on board");
    }
    unitToBeRemoved.coordinates.x = null;
    unitToBeRemoved.coordinates.y = null;
    this._unitGrid[unitToBeRemoved.coordinates.x][unitToBeRemoved.coordinates.y] = null;
    const returnedIndex = this._unitList.findIndex(unit => unit.Id === unitToBeRemoved.Id);
    this._unitList.splice(returnedIndex, 1);
  }
  public placeunit(newCoordinates: ICoordinates, unit: Iunit): void {
    if (!this.coordinateValidator(newCoordinates)) {
      throw new Error("unit cannot be placed");
    }
    if (!this.isFree(newCoordinates)) {
      throw new Error("Position is not free");
    }
    if (this._unitList.find(x => x.Id === unit.Id)) {
      throw new Error("unit already exists on list");
    }
    unit.coordinates = newCoordinates;
    this._unitGrid[newCoordinates.x][newCoordinates.y] = unit;
    this._unitList.push(unit);
  }
}
