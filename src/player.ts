import { injectable } from 'inversify';
import { IBoard } from "./board";
import "reflect-metadata";

export interface IUnit {
    Id: number;
    XPos: number;
    YPos: number;
    getCoordinates(playerId: number) : any;
}

export interface IPlayer extends IUnit {
    move(newYPos: number, newXPos: number, player: IPlayer) : void;
}

//eventually move to its only file
export interface IMonster extends IUnit{
    move() : void;
}

export type PlayerBuildFuncType = (id: number, xPos: number, yPos: number, board: IBoard) => IPlayer;

@injectable()
export default class Player implements IPlayer {
    static Build(id: number, xPos: number, yPos: number, board: IBoard): IPlayer {
        return new Player(id, xPos, yPos, board);
    }

    Id: number;
    XPos: number;
    YPos: number;

    // protected Id: number;
    // protected XPos: number;
    // protected YPos: number;

    protected constructor(id: number, xPos: number, yPos: number, private board: IBoard) {
        this.Id = id;
        this.XPos = xPos;
        this.YPos = yPos;
    }

    getCoordinates(id: number) : any {
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