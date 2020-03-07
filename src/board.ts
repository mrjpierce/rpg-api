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

  //Goals before next week:

  //2. get remove player to the same point with encapsulation and tests set up in same point
  //3. getPlayerAt func set
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
    //will move this to private
    if (
      this._playerGrid[newCoordinates.x][newCoordinates.y] != null ||
      this._playerGrid[newCoordinates.x][newCoordinates.y] != undefined
    ) {
      throw new Error("Position is not free");
    }
    return true;
  }

  // create another fucntion getPlayerAt, provide coordiantes to this function and then it returns the player at the given coordinates
  // this would take only coordinates obvy

  removePlayer(currentCoordinates: ICoordinates): void {
    // all we need is the player no the current cooordinates
    // remove player does take a player as an argument so we can ensure like the place player that the correct player
    //
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
