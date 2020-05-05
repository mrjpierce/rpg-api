import "reflect-metadata";
import { inject, injectable } from "inversify";
import Board from "./board";
import { Unit } from "./unit";

@injectable()
export class Service {
  protected board: Board;
  protected unit1: Unit;
  protected unit2: Unit;

  constructor(@inject(Board) board: Board, @inject(Unit) unit1: Unit, @inject(Unit) unit2: Unit) {
    this.board = board;
    this.unit1 = unit1;
    this.unit2 = unit2;
    const firstService = new Service(this.board, this.unit1, this.unit2);

    console.log(firstService);
  }
}
