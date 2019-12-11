import { injectable } from "inversify";
import Player, { IPlayer, ICoordinates } from "./player";
import { ITerrain } from "./terrain";

export interface IBoard {
  isFree(coordinates: ICoordinates): boolean;
  removePlayer(coordinates: ICoordinates): void;
  placePlayer(coordinates: ICoordinates, player: IPlayer): void;
  move(newCoordinates: ICoordinates, player: IPlayer): boolean;
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
    if (
      this.playerGrid[newCoordinates.x][newCoordinates.y] === null ||
      this.playerGrid[newCoordinates.x][newCoordinates.y] === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  move(newCooridnates: ICoordinates, player: Player): boolean {
    if (this.isFree(newCooridnates)) {
      console.log("here");
      this.removePlayer(player.coordinates);
      console.log("after remove");
      this.placePlayer(newCooridnates, player);
      console.log("after place player");
      player.coordinates = newCooridnates;
      return true;
    }
    return false;
  }

  removePlayer(currentCoordinates: ICoordinates): void {
    const currentPlayer = this.playerGrid[currentCoordinates.x][currentCoordinates.y];
    this.playerGrid[currentCoordinates.x][currentCoordinates.y] = null;
    const returnedIndex = this.playerList.findIndex(player => player.Id === currentPlayer.Id);
    this.playerList.splice(returnedIndex, 1);
  }

  placePlayer(newCoordinates: ICoordinates, player: Player): void {
    // why the hell isn't it getting called on the move??
    this.playerGrid[newCoordinates.x][newCoordinates.y] = player;
    console.log(newCoordinates, "player method");
    this.playerList.push(player);
    console.log("place player end of player", player);
  }
}
