import Player, { IPlayer, ICoordinates } from "./player";
import { ITerrain } from "./terrain";
import { injectable } from "inversify";

export interface IBoard {
  isFree(coordinates: ICoordinates): boolean;
  removePlayer(coordinates: ICoordinates): void;
  placePlayer(coordinates: ICoordinates, player: IPlayer): void;
  move(newCoordinates: ICoordinates, player: IPlayer): void;
}

@injectable()
export default class Board implements IBoard {
  private playerGrid: Array<Array<IPlayer | null>>;
  private terrainGrid: Array<Array<ITerrain>>;
  public readonly playerList: Array<IPlayer>;

  constructor(gridSize: number) {
    this.playerList = new Array<IPlayer>();
    this.terrainGrid = new Array<Array<ITerrain>>(gridSize);
    this.playerGrid = new Array<Array<IPlayer>>(gridSize);
    for (let i = 0; i < this.playerGrid.length; i++) {
      this.playerGrid[i] = new Array<IPlayer>(gridSize);
      this.terrainGrid[i] = new Array<ITerrain>(gridSize);
    }
  }

  isFree(newCoordinates: ICoordinates): boolean {
    if (typeof this.playerGrid[newCoordinates.x][newCoordinates.y] === null) {
      return true;
    } else {
      return false;
    }
  }

  move(newCooridnates: ICoordinates, player: Player): void {
    if (this.isFree(newCooridnates)) {
      this.removePlayer(newCooridnates);
      this.placePlayer(newCooridnates, player);
      player.coordinates = newCooridnates;
    } else false;
  }

  removePlayer(currentCoordinates: ICoordinates): void {
    const currentPlayer = this.playerGrid[currentCoordinates.x][currentCoordinates.y];
    this.playerGrid[currentCoordinates.x][currentCoordinates.y] = null;
    const returnedIndex = this.playerList.findIndex(player => player.Id === currentPlayer.Id);
    this.playerList.splice(returnedIndex, 1);
    // playerList needs to be exposed to the outside world
  }

  placePlayer(newCoordinates: ICoordinates, player: Player): void {
    this.playerGrid[newCoordinates.x][newCoordinates.y] = player;
    this.playerList.push(player);
  }
}
