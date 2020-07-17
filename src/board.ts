import "reflect-metadata";
import { injectable } from "inversify";
import { IUnit } from "./unit";
import { ICoordinates } from "./unit";
import { ITerrain } from "./terrain";
import { IBoardDO } from "./do/board-do";
import { Packagable } from "./do/game-do";

export interface IBoard {
  id?: string;
  isFree(coordinates: ICoordinates): boolean;
  removeUnit(unit: IUnit): void;
  placeUnit(coordinates: ICoordinates, unit: IUnit): void;
  move(newCoordinates: ICoordinates, unit: IUnit): boolean;
  unitGrid: ReadonlyArray<ReadonlyArray<IUnit | null>>;
  unitList: ReadonlyArray<IUnit>;
  checkUnitList(id: string): boolean;
  unitAtCoordinates(cooordinates: ICoordinates): IUnit;
}

@injectable()
export class Board extends Packagable<IBoardDO> implements IBoard {
  public readonly _id: string;
  private _unitGrid: Array<Array<IUnit | null>>;
  private _terrainGrid: Array<Array<ITerrain>>;
  private _unitList: Array<IUnit>;

  public get id(): string {
    return this._id;
  }

  public get unitGrid(): ReadonlyArray<ReadonlyArray<IUnit | null>> {
    return this._unitGrid;
  }

  public get unitList(): ReadonlyArray<IUnit> {
    return this._unitList;
  }

  public get gridSize(): number {
    return this.unitGrid.length;
  }

  constructor(init?: Partial<IBoardDO>) {
    super();
    this._id = init?.id;
    this._unitList = init?.unitList || new Array<IUnit>();
    this._terrainGrid = init?.terrainGrid || new Array<Array<ITerrain>>();

    this._unitGrid = new Array<Array<IUnit>>(init?.gridSize || 0);
    for (let i = 0; i < this._unitGrid.length; i++) {
      this._unitGrid[i] = new Array<IUnit>(init.gridSize);
      if (!init?.terrainGrid) {
        this._terrainGrid[i] = new Array<ITerrain>(init.gridSize);
      }
    }

    // init?.unitList?.forEach(unit => {
    //   this.placeUnit(unit.coordinates, unit);
    //   console.log("unit list");
    // });
    // I don't think I'll need this guy. Since i'm probably never gonna include a unitList with an init this will never be called
  }

  public checkUnitList(id: string): boolean {
    const idBeingChecked = this._unitList.findIndex(unit => unit.id.localeCompare(id) === 0);

    if (idBeingChecked != 0) {
      return false;
    }
    return true;
  }

  public unitAtCoordinates(coordiantes: ICoordinates): IUnit {
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
    if (coordiantes.x > this.gridSize - 1 || coordiantes.y > this.gridSize - 1) {
      return false;
    }
    return true;
  }

  public move(newCooridnates: ICoordinates, unit: IUnit): boolean {
    if (!this.isFree(newCooridnates)) {
      return false;
    }
    this.removeUnit(unit);
    this.placeUnit(newCooridnates, unit);
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

  public removeUnit(unitToBeRemoved: IUnit): void {
    const unitOnList = this._unitList.find(unit => unit.id.localeCompare(unitToBeRemoved.id) === 0);
    const unitOnGrid = this._unitGrid[unitToBeRemoved.coordinates.x][unitToBeRemoved.coordinates.y];
    if (unitOnGrid === undefined || unitOnList === undefined) {
      throw new Error("Provided unit is not on grid or list");
    }
    unitToBeRemoved.coordinates.x = null;
    unitToBeRemoved.coordinates.y = null;
    this._unitGrid[unitToBeRemoved.coordinates.x][unitToBeRemoved.coordinates.y] = null;
    const returnedIndex = this._unitList.findIndex(unit => unit.id.localeCompare(unitToBeRemoved.id) === 0);
    this._unitList.splice(returnedIndex, 1);
  }

  public placeUnit(newCoordinates: ICoordinates, unit: IUnit): void {
    if (!this.coordinateValidator(newCoordinates)) {
      throw new Error("unit cannot be placed");
    }
    if (!this.isFree(newCoordinates)) {
      throw new Error("Position is not free");
    }
    if (this._unitList.find(x => x.id === unit.id)) {
      throw new Error("unit already exists on list");
    }
    unit.coordinates = newCoordinates;
    this._unitGrid[newCoordinates.x][newCoordinates.y] = unit;
    this._unitList.push(unit);
  }

  public toDataObject(): IBoardDO {
    return {
      id: this.id,
      gridSize: this.gridSize,
      terrainGrid: this._terrainGrid,
      unitList: this._unitList
    };
  }
}
