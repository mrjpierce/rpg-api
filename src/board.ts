import {IPlayer} from './player';
export interface IBoard {
    isFree(xPos:number, yPos:number): boolean;
    removePlayer(xPos:number, yPos:number): void;
    placePlayer (newXPos:number, newYPos:number, player: IPlayer): void;
}

export default class Board implements IBoard {
    private playerGrid: Array<Array<IPlayer>>;
    constructor (gridSize:number){
       this.playerGrid = new Array<Array<IPlayer>>(gridSize);
       for (let i = 0; i < this.playerGrid.length; i++) {
           this.playerGrid[i] = new Array<IPlayer>(gridSize);
       }
   }

   isFree(xPos, yPos) {
    if (typeof this.playerGrid[xPos][yPos] === null){
        return true;
    }else false;
   }
 
   removePlayer(xPos, yPos) {
    this.playerGrid[xPos][yPos] = null
   }

   placePlayer (newXPos, newYPos, player) {
    this.playerGrid[newXPos][newYPos] = player;
    // so after this gets called its returning nothing right now is the player object that is created by the constructor updated?
   }
}