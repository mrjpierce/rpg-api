import { injectable } from 'inversify';
import { IBoard } from "./board";

export interface IUnit {
    Id: number;
    XPos: number;
    YPos: number;
    getCordinates(playerId: number) : any;
}

export interface IPlayer extends IUnit {
    move(newYPos: number, newXPos: number, player: IPlayer) : void;
}

//eventually move to its only file
export interface IMonster extends IUnit{
    move() : void;
}

@injectable()
export default class Player implements IPlayer {
    private Id: number;
    private XPos: number;
    private YPos: number;

    constructor(id: number, xPos: number, yPos: number, private board: IBoard) {
        this.Id = id;
        this.XPos = xPos;
        this.YPos = yPos;
    }

    getCordinates(id: number) : any {
        if(id === this.Id){
            const cordinates : any = new Array(this.XPos, this.YPos)
            return cordinates 
        } else false
    }

    move(newXPos: number, newYPos: number) : void {
        if(this.board.isFree(newXPos, newYPos)) {
            this.board.removePlayer(this.XPos, this.YPos);
            this.board.placePlayer(newXPos, newYPos, this);
            this.XPos = newXPos;
            this.YPos = newYPos;
        } else false
    }
}