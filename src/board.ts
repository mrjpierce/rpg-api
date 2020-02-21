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
  checkPlayerId(id: number): boolean;
}

@injectable()
export default class Board implements IBoard {
  private _playerGrid: Array<Array<IPlayer | null>>;
  private terrainGrid: Array<Array<ITerrain>>;
  private playerList: Array<IPlayer>;
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
  // TODO make playerlist private and build functions around the array that deal with any client side operations that might need info regarding the player list
  // TODO ensure that the playerlist and playerGrid cannot be updated seperatley and never get out of sync

  // wrapping the player list in a function that would check to see if a provided Id corresponded with a id of player on the playerlist

  public get gridLength(): number {
    return this.playerGrid.length;
  }
  public checkPlayerId(id: number): boolean {
    return true;
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
    // guarntee that we never would have to check this because the grid and list are updated at the exact same time and don't fail
    if (returnedIndex === -1) {
      throw new Error("Provided id does not corespond with any id of the existing players");
    }
    this.playerList.splice(returnedIndex, 1);
  }

  // when writing a unit test, or each individual function, black box

  placePlayer(newCoordinates: ICoordinates, player: IPlayer): void {
    // throw if the coordinateValidator
    // there is not a way to reconcile this error thus throwing an error explaining is the best move

    // if(!this.coordinateValidator)
    // toDo : finish check here with cooridnate validator and throw appropriate error
    // so the only way i have seen this not work is when the
    // if(newCoordinates.x <= this.gridLength) {
    // }
    this._playerGrid[newCoordinates.x][newCoordinates.y] = player;
    // if (player.coordinates.x !== newCoordinates.x) {
    //   throw new Error("players coordinates did not update correctly");
    // }
    this.playerList.push(player);
  }
}
