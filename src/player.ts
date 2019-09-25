import { injectable } from 'inversify';
import { IBoard } from "./board";
import "reflect-metadata";

export interface IUnit {
    Id: number;
    XPos: number;
    YPos: number;
    coordinates: IPosition;
}

export interface IPlayer extends IUnit {
    move(newXPos: number, newYPos: number) : void;
}

//eventually move to its only file
export interface IMonster extends IUnit{
    move() : void;
}

export type PlayerBuildFuncType = (id: number, xPos: number, yPos: number, board: IBoard) => IPlayer;

export interface IPosition {
    x: number;
    y: number;
}

export abstract class Unit implements IUnit {
    public readonly Id: number;
    protected _xPos: number;
    protected _yPos: number;

    public get XPos(): number {
        return this._xPos;
    }

    public get YPos(): number {
        return this._yPos;
    }

    public get coordinates(): IPosition {
        return {
            x: this.XPos,
            y: this.YPos
        };
    }

    constructor(id: number, xPos: number, yPos: number, private board: IBoard) {
        this.Id = id;
        this._xPos = xPos;
        this._yPos = yPos;
    }

    move(newXPos: number, newYPos: number) : void {
        if(this.board.isFree(newXPos, newYPos)) {
            this.board.removePlayer(this.XPos, this.YPos);
            this.board.placePlayer(newXPos, newYPos, this);
            this._xPos = newXPos;
            this._yPos = newYPos;
        } else false
    }
}

@injectable()
export default class Player extends Unit implements IPlayer {
    static Build(id: number, xPos: number, yPos: number, board: IBoard): IPlayer {
        return new Player(id, xPos, yPos, board);
    }

    protected constructor(id: number, xPos: number, yPos: number, board: IBoard) {
        super(id, xPos, yPos, board);
    }
}

// Task 1: Define Monster class that extends Unit