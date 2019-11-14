import {IPlayer} from './player';
import {IBoard} from './board';

export interface IGame {
    board?: IBoard;
}
export default class Game {
    constructor (private board: IBoard, private players: IPlayer[]){
        this.players.forEach((player, index) => {
            this.board.placePlayer(index, index, player);
        });
    }
}