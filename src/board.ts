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
  //Goals before next week:
  public move(newCooridnates: ICoordinates, player: IPlayer): boolean {
    if (!this.coordinateValidator(newCooridnates)) {
      return false;
    }
    try {
      this.isFree(newCooridnates);
      this.removePlayer(player);
      player.coordinates = newCooridnates;
      this.placePlayer(newCooridnates, player);
    } catch (e) {
      throw e;
    }
    return true;
  }

  public isFree(newCoordinates: ICoordinates): boolean {
    if (
      this._playerGrid[newCoordinates.x][newCoordinates.y] != null ||
      this._playerGrid[newCoordinates.x][newCoordinates.y] != undefined
    ) {
      throw new Error("Position is not free");
    }
    return true;
  }

  public removePlayer(playerToBeRemoved: IPlayer): void {
    const playerOnList = this._playerList.find(player => player.Id === playerToBeRemoved.Id);
    const playerOnGrid = this._playerGrid[playerToBeRemoved.coordinates.x][playerToBeRemoved.coordinates.y];
    if (playerOnGrid == undefined) {
      throw new Error("Provided player is not on grid");
    }
    if (!this.checkPlayerList(playerToBeRemoved.Id)) {
      throw new Error("Provided player is not on player list");
    }
    if (!Object.is(playerOnList, playerOnGrid)) {
      throw new Error("Player on grid and list don't match");
    }
    this._playerGrid[playerToBeRemoved.coordinates.x][playerToBeRemoved.coordinates.y] = null;
    const returnedIndex = this._playerList.findIndex(player => player.Id === playerToBeRemoved.Id);
    this._playerList.splice(returnedIndex, 1);
  }

  public placePlayer(newCoordinates: ICoordinates, player: IPlayer): void {
    if (!this.coordinateValidator(newCoordinates)) {
      throw new Error("player cannot be placed");
    }
    if (!this.isFree(newCoordinates)) {
      throw new Error("Position is not free");
    }
    if (this._playerList.find(value => value.Id === player.Id)) {
      throw new Error("Player already exists on list");
    }
    this._playerGrid[newCoordinates.x][newCoordinates.y] = player;
    this._playerList.push(player);
  }
}
