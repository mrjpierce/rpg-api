import {IBoard} from "./board";

export interface IPlayer {
    id: number;
    xPos: number;
    yPos: number;
    move(newYPos: number, newXPos: number, player: IPlayer) : void;
}

export default class Player implements IPlayer {
    constructor(public id: number, public xPos: number, public yPos: number, private board: IBoard) {}

    move(newXPos: number, newYPos: number) : void {
        if(this.board.isFree(newXPos, newYPos)) {
            this.board.removePlayer(this.xPos, this.yPos);
            this.board.placePlayer(newXPos, newYPos, this)
            this.xPos = newXPos
            this.yPos = newYPos
        } else false;
    }
}