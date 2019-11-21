import Player, {IPlayer, ICoordinates} from './player';
import {ITerrain} from './terrain';
import { injectable } from 'inversify';

export interface IBoard {
  isFree(coordinates: ICoordinates): boolean;
  removePlayer(coordinates: ICoordinates): void;
  placePlayer (coordinates: ICoordinates, player: IPlayer): void;
  move (newCoordinates: ICoordinates, player: IPlayer): void;
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

  isFree(coordinates: ICoordinates) {
    if (typeof this.playerGrid[coordinates.x][coordinates.y] === null){
      return true;
    } else { 
      return false; 
    }
  }

  move(newCooridnates: ICoordinates, player: Player) : void {
    if(this.isFree(newCooridnates)) {
        this.removePlayer(newCooridnates);
        this.placePlayer(newCooridnates, player);
        player.setCoordinates(newCooridnates);
    } else false
  }

  removePlayer(coordinates: ICoordinates) {
    this.playerGrid[coordinates.x][coordinates.y] = null;
  }

  placePlayer(newCoordinates: ICoordinates, player: Player) {
    this.playerGrid[newCoordinates.x][newCoordinates.y] = player;
  }
}
