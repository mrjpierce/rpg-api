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
  // create a pulbic getter for grid size, add a public property with where i store that info and use it down below

  private coordinateValidator = (coordiantes: ICoordinates): boolean =>
    // we should be more explict here and actually make sure it is an number, js does compare strings and numbers werildy
    coordiantes.x && coordiantes.y < 4 && coordiantes.x && coordiantes.y >= 0;

  isFree(newCoordinates: ICoordinates): boolean {
    if (
      this._playerGrid[newCoordinates.x][newCoordinates.y] === null ||
      this._playerGrid[newCoordinates.x][newCoordinates.y] === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  move(newCooridnates: ICoordinates, player: IPlayer): boolean {
    if (!this.coordinateValidator(newCooridnates)) {
      return false;
    }
    if (this.isFree(newCooridnates)) {
      // wrap these in a try/catch, then in the lower level methods to throw errors
      // removePlayer and placePlayer should be atomic
      this.removePlayer(player.coordinates);
      player.coordinates = newCooridnates;
      this.placePlayer(newCooridnates, player);
      return true;
    }
    return false;
  }

  // throw errors if the operation is fatal to the whole thing

  removePlayer(currentCoordinates: ICoordinates): void {
    // when using certain languages we relinquish some contorl over certain things
    // size of memory bank, heap size, the garbage collector
    // in node js is inturpeting it down to c++
    // age old question of failing gracefully or returning

    // check to see if there is even a player occupying the coordiantes we are giving
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
