import "reflect-metadata";
import { injectable } from "inversify";
import { IPlayer, ICoordinates } from "./player";
import { ITerrain } from "./terrain";

export interface IBoard {
  isFree(coordinates: ICoordinates): boolean;
  removePlayer(coordinates: ICoordinates): void;
  placePlayer(coordinates: ICoordinates, player: IPlayer): void;
  move(newCoordinates: ICoordinates, player: IPlayer): boolean;
  playerGrid: ReadonlyArray<ReadonlyArray<IPlayer | null>>;
}

@injectable()
export default class Board implements IBoard {
  private _playerGrid: Array<Array<IPlayer | null>>;
  private terrainGrid: Array<Array<ITerrain>>;
  public readonly playerList: Array<IPlayer>;
  public get playerGrid(): ReadonlyArray<ReadonlyArray<IPlayer | null>> {
    return this._playerGrid;
  }

  constructor(gridSize: number) {
    this.playerList = new Array<IPlayer>();
    this.terrainGrid = new Array<Array<ITerrain>>(gridSize);
    this._playerGrid = new Array<Array<IPlayer>>(gridSize);
    for (let i = 0; i < this._playerGrid.length; i++) {
      this._playerGrid[i] = new Array<IPlayer>(gridSize);
      this.terrainGrid[i] = new Array<ITerrain>(gridSize);
    }
  }

  public get gridLength(): number {
    return this.playerGrid.length;
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

  isFree(newCoordinates: ICoordinates): boolean {
    if (
      this._playerGrid[newCoordinates.x][newCoordinates.y] != null ||
      this._playerGrid[newCoordinates.x][newCoordinates.y] != undefined
    ) {
      throw new Error("Position is not free");
    }
    return true;
  }

  move(newCooridnates: ICoordinates, player: IPlayer): boolean {
    if (!this.coordinateValidator(newCooridnates)) {
      return false;
    }
    try {
      this.isFree(newCooridnates);
      this.removePlayer(player.coordinates);
      player.coordinates = newCooridnates;
      this.placePlayer(newCooridnates, player);
    } catch (e) {
      throw e;
    }
    return true;
  }

  removePlayer(currentCoordinates: ICoordinates): void {
    if (currentCoordinates.x >= this.playerGrid.length) {
      throw new Error("One of the given cooridnates is outside board bounds");
    }
    const currentPlayer = this._playerGrid[currentCoordinates.x][currentCoordinates.y];
    if (!currentPlayer) {
      throw new Error("No player at given coordinates");
    }
    // TDD thinking in terms of outcomes, first might be quick dirty code
    // Premature refactoring is the root of all evil!
    // Should be extremely specific with my refactor

    this._playerGrid[currentCoordinates.x][currentCoordinates.y] = null;
    const returnedIndex = this.playerList.findIndex(player => player.Id === currentPlayer.Id);
    if (!returnedIndex) {
      throw new Error("Provided id does not corespond with any id of the existing players");
    }
    console.log(returnedIndex);
    this.playerList.splice(returnedIndex, 1);
  }

  placePlayer(newCoordinates: ICoordinates, player: IPlayer): void {
    this._playerGrid[newCoordinates.x][newCoordinates.y] = player;
    this.playerList.push(player);
  }
}
