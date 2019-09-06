import Player, {IPlayer} from './player'
import Board, {IBoard} from './board'

interface IGame {
    board: IBoard;
}
export default class Game {
    gameBoard: IBoard;
    player1: IPlayer;
    player2: IPlayer;
    constructor (boardSize: number, playerOneInfo: IPlayer, playerTwoInfo: IPlayer){
        this.gameBoard = new Board(boardSize);
        
        this.player1 = new Player(1, 0, 0, this.gameBoard);
        this.player2 = new Player(2, 0, 1, this.gameBoard);
        this.gameBoard.placePlayer(this.player1.xPos, this.player1.yPos, this.player1);
        this.gameBoard.placePlayer(this.player2.xPos, this.player2.yPos, this.player2);
    
        // const {id1, xPos1, yPos1} = playerOneInfo;
        // const {id2, xPos2, yPos2} = playerTwoInfo
        // this.player1 = new Player(id1, xPos1, yPos1, this.gameBoard);
        // this.player2 = new Player(id2, xPos2, yPos2, this.gameBoard);
        // this.gameBoard.placePlayer(xPos1, yPos1, this.player1);
        // this.gameBoard.placePlayer(xPos2, yPos2, this.player2);
    }
    
}
const exBoard = new Game (3, new Player(1, 0, 0, this.gameBaord), new Player(2, 0, 1, this.gameBaord))
console.log(exBoard.gameBoard)
