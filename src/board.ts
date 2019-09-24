import Player, {IPlayer} from './player';
import {ITerrain} from './terrain';
import { injectable } from 'inversify';

export interface IBoard {
  isFree(xPos:number, yPos:number): boolean;
  removePlayer(xPos: number, yPos: number): void;
  placePlayer (newXPos: number, newYPos: number, player: IPlayer): void;
}

@injectable()
export default class Board implements IBoard {
  private playerGrid: Array<Array<IPlayer | null>>;
  private terrainGrid: Array<Array<ITerrain>>;

  constructor (gridSize: number) {
    this.terrainGrid = new Array<Array<ITerrain>>(gridSize);        
    this.playerGrid = new Array<Array<IPlayer>>(gridSize);
    for (let i = 0; i < this.playerGrid.length; i++) {
      this.playerGrid[i] = new Array<IPlayer>(gridSize);
      this.terrainGrid[i] = new Array<ITerrain>(gridSize);
    } 
  }

  isFree(xPos: number, yPos: number) {
    if (typeof this.playerGrid[xPos][yPos] === null){
      return true;
    } else { 
      return false; 
    }
  }

  removePlayer(xPos: number, yPos: number) {
    this.playerGrid[xPos][yPos] = null
  }

  placePlayer(newXPos: number, newYPos: number, player: Player) {
    this.playerGrid[newXPos][newYPos] = player;
  }
}
