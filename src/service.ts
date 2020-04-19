import "reflect-metadata";
import { inject, injectable } from "inversify";
import Board from "./board";
import unit from "./unit";

@injectable()
export class Service {
  protected board: Board;
  protected unit1: unit;
  protected unit2: unit;

  constructor(@inject(Board) board: Board, @inject(unit) unit1: unit, @inject(unit) unit2: unit) {
    this.board = board;
    this.unit1 = unit1;
    this.unit2 = unit2;
    const firstService = new Service(this.board, this.unit1, this.unit2);

    console.log(firstService);
  }
}
