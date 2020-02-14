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
    // else {
    //   if (coordiantes.x || coordiantes.y <= 3) {
    //     return true;
    //   }
    // }
    return true;
  }

  // isFree(newCoordinates: ICoordinates): boolean {
  //   // have to think how to handle this!!!!! can't return boolean

  //   if (
  //     !this._playerGrid[newCoordinates.x][newCoordinates.y] === null ||
  //     !this._playerGrid[newCoordinates.x][newCoordinates.y] === undefined
  //   ) {
  //     throw new Error("Position is not free");
  //   }
  //   return true;
  // }

  isFree(newCoordinates: ICoordinates): boolean {
    if (
      this._playerGrid[newCoordinates.x][newCoordinates.y] === null ||
      this._playerGrid[newCoordinates.x][newCoordinates.y] === undefined
    ) {
      return true;
    } else {
      return false;
      throw new Error("Position is not free");
    }
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
    // wrapping it in if statement and use the throw

    const currentPlayer = this._playerGrid[currentCoordinates.x][currentCoordinates.y];
    // keyword "throw"
    this._playerGrid[currentCoordinates.x][currentCoordinates.y] = null;
    const returnedIndex = this.playerList.findIndex(player => player.Id === currentPlayer.Id);
    // think about what could go wrong ex: splice doesn't remove the player
    // we've got the happy path, now we need to check all the other wrong paths
    this.playerList.splice(returnedIndex, 1);
  }

  placePlayer(newCoordinates: ICoordinates, player: IPlayer): void {
    this._playerGrid[newCoordinates.x][newCoordinates.y] = player;
    this.playerList.push(player);
  }
}
