import { injectable } from 'inversify';
import "reflect-metadata";

export interface IUnit {
    Id: number;
}

export interface IPlayer extends IUnit {   
}

export interface IMonster extends IUnit {   
}

export interface IPosition {
    x: number;
    y: number;
}

export abstract class Unit implements IUnit {
    public readonly Id: number;
    protected _xPos: number;
    protected _yPos: number;

    public get coordinates(): IPosition {
        return {
            x: this._xPos,
            y: this._yPos
        };
    }

    public set setXPos(newXPos){
        this._xPos = newXPos;
    }
    public set setYPos(newYPos){
        this._yPos = newYPos;
    }

    constructor(id: number, xPos: number, yPos: number) {
        this.Id = id;
        this._xPos = xPos;
        this._yPos = yPos;
    }
}

@injectable()
export default class Player extends Unit implements IPlayer {
    static Build(id: number, xPos: number, yPos: number): IPlayer {
        return new Player(id, xPos, yPos);
    }

    protected constructor(id: number, xPos: number, yPos: number) {
        super(id, xPos, yPos);
    }
}

@injectable()
export class Monster extends Unit implements IMonster {
    static Build(id: number, xPos: number, yPos: number): IPlayer {
        return new Monster(id, xPos, yPos);
    }

    protected constructor(id: number, xPos: number, yPos: number) {
        super(id, xPos, yPos);
    }
}