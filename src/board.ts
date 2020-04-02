import "reflect-metadata";
import { injectable } from "inversify";
import { IPlayer, ICoordinates } from "./player";
import { ITerrain } from "./terrain";

export interface IBoard {
  isFree(coordinates: ICoordinates): boolean;
  removePlayer(player: IPlayer): void;
  placePlayer(coordinates: ICoordinates, player: IPlayer): void;
  move(newCoordinates: ICoordinates, player: IPlayer): boolean;
  playerGrid: ReadonlyArray<ReadonlyArray<IPlayer | null>>;
  playerList: ReadonlyArray<IPlayer>;
  checkPlayerList(id: number): boolean;
  playerAtCoordinates(cooordinates: ICoordinates): IPlayer;
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
  public playerAtCoordinates(coordiantes: ICoordinates): IPlayer {
    if (!this.coordinateValidator(coordiantes)) {
      throw new Error("Given coordinates are not compatable");
    }
    if (this._playerGrid[coordiantes.x][coordiantes.y] == null || undefined) {
      throw new Error("No player at given coordinates");
    } else return this._playerGrid[coordiantes.x][coordiantes.y];
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
  public move(newCooridnates: ICoordinates, player: IPlayer): boolean {
    if (!this.isFree(newCooridnates)) {
      return false;
    }
    this.removePlayer(player);
    this.placePlayer(newCooridnates, player);
    return true;
  }
  public isFree(newCoordinates: ICoordinates): boolean {
    if (!this.coordinateValidator(newCoordinates)) {
      return false;
    }
    if (
      this._playerGrid[newCoordinates.x][newCoordinates.y] != null ||
      this._playerGrid[newCoordinates.x][newCoordinates.y] != undefined
    ) {
      return false;
    }
    return true;
  }
  public removePlayer(playerToBeRemoved: IPlayer): void {
    const playerOnList = this._playerList.find(player => player.Id === playerToBeRemoved.Id);
    const playerOnGrid = this._playerGrid[playerToBeRemoved.coordinates.x][playerToBeRemoved.coordinates.y];
    if (playerOnGrid === undefined || playerOnList === undefined) {
      throw new Error("Provided player is not on grid or list");
    }
    if (playerToBeRemoved !== playerOnList) {
      throw new Error("Player id mismatch; Player passed does not match the player with corresponding id on board");
    }
    playerToBeRemoved.coordinates.x = null;
    playerToBeRemoved.coordinates.y = null;
    this._playerGrid[playerToBeRemoved.coordinates.x][playerToBeRemoved.coordinates.y] = null;
    const returnedIndex = this._playerList.findIndex(player => player.Id === playerToBeRemoved.Id);
    this._playerList.splice(returnedIndex, 1);
  }
  public placePlayer(newCoordinates: ICoordinates, player: IPlayer): void {
    if (!this.coordinateValidator(newCoordinates)) {
      throw new Error("Player cannot be placed");
    }
    if (!this.isFree(newCoordinates)) {
      throw new Error("Position is not free");
    }
    if (this._playerList.find(value => value.Id === player.Id)) {
      throw new Error("Player already exists on list");
    }
    player.coordinates = newCoordinates;
    this._playerGrid[newCoordinates.x][newCoordinates.y] = player;
    this._playerList.push(player);
  }
}
