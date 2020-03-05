import "reflect-metadata";
import { injectable } from "inversify";
import { IPlayer, ICoordinates } from "./player";
import { ITerrain } from "./terrain";
import isEqual = require("lodash/isEqual");

export interface IBoard {
  isFree(coordinates: ICoordinates): boolean;
  removePlayer(coordinates: ICoordinates): void;
  placePlayer(coordinates: ICoordinates, player: IPlayer): void;
  move(newCoordinates: ICoordinates, player: IPlayer): boolean;
  playerGrid: ReadonlyArray<ReadonlyArray<IPlayer | null>>;
  playerList: ReadonlyArray<IPlayer>;
  checkPlayerList(id: number): boolean;
}

@injectable()
export default class Board implements IBoard {
  private _playerGrid: Array<Array<IPlayer | null>>;
  private _terrainGrid: Array<Array<ITerrain>>;
  private _playerList: Array<IPlayer>;
  public get playerGrid(): ReadonlyArray<ReadonlyArray<IPlayer | null>> {
    return this._playerGrid;
  }
  public get playerList(): ReadonlyArray<IPlayer> {
    return this._playerList;
  }
  public get gridLength(): number {
    return this.playerGrid.length;
  }
  constructor(gridSize: number) {
    this._playerList = new Array<IPlayer>();
    this._terrainGrid = new Array<Array<ITerrain>>(gridSize);
    this._playerGrid = new Array<Array<IPlayer>>(gridSize);
    for (let i = 0; i < this._playerGrid.length; i++) {
      this._playerGrid[i] = new Array<IPlayer>(gridSize);
      this._terrainGrid[i] = new Array<ITerrain>(gridSize);
    }
  }
  public checkPlayerList(id: number): boolean {
    const idBeingChecked = this._playerList.findIndex(player => player.Id === id);
    if (idBeingChecked === -1) {
      return false;
    }
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
  listGridChecker(player: IPlayer): boolean {
    const returnedListPlayer = this._playerList.filter(p => p == player);
    const returnedGridPlayer = this._playerGrid[player.coordinates.x].filter(p => p == player);
    // need to set up the list Grid Checker to handle if there is a undefined)
    console.log(returnedListPlayer);
    console.log(returnedGridPlayer);
    if (returnedGridPlayer && returnedListPlayer === []) {
      console.log(returnedListPlayer);
      console.log(returnedGridPlayer);
      throw new Error("Something is wrong stupid");
    } else return isEqual(returnedGridPlayer[0], returnedListPlayer[0]);
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

  isFree(newCoordinates: ICoordinates): boolean {
    if (
      this._playerGrid[newCoordinates.x][newCoordinates.y] != null ||
      this._playerGrid[newCoordinates.x][newCoordinates.y] != undefined
    ) {
      throw new Error("Position is not free");
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
    this._playerGrid[currentCoordinates.x][currentCoordinates.y] = null;
    const returnedIndex = this._playerList.findIndex(player => player.Id === currentPlayer.Id);
    this._playerList.splice(returnedIndex, 1);
  }

  placePlayer(newCoordinates: ICoordinates, player: IPlayer): void {
    if (!this.coordinateValidator(newCoordinates)) {
      throw new Error("player cannot be placed");
    }
    this._playerGrid[newCoordinates.x][newCoordinates.y] = player;
    this._playerList.push(player);
    if (!this.listGridChecker(player)) {
      this._playerGrid[newCoordinates.x][newCoordinates.y] = null;
      this._playerList.splice(player.Id, 1);
      throw new Error("player was not placed properly");
    }
  }
}
