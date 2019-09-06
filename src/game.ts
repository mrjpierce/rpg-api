import {IPlayer} from './player'
import Board, {IBoard} from './board'

interface IGame {
    board: IBoard;
}
export default class Game implements IGame {
    constructor (player1: IPlayer, player2: IPlayer, board: IBoard){
        board = new Board(3);
        // will have to change how i place the player in the board, tip we already wrote the code somewhere that i just need to change
        board.playerGrid[1][0] = new player1();
        //
        //this class will return a game object with a board object in it and a playerGrid inside the board object
    }
}