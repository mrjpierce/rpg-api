import Player, {IPlayer} from './player';
import Board, {IBoard} from './board';

interface IGame {
    gameBoard: IBoard;
}
export default class Game implements IGame {

    constructor (boardSize: number, player1: IPlayer, playerTwoInfo: IPlayer){

        //todo 1. take out instantiating classes in another class, create the most encompassing object first, 2. placing the players using a constaried centrailized method, ie move method, 3. need to proctect those properites for move method to only the player object
        // 4. enharitance with monsters and players
        // using the the move method as a way to constrain the way we set the coridnate state. so calling the move method
        // the player and board hold cordinates and they should never be  out of sync
        // the state of the board cordiants and the player cordinates, two different states that always need to be in aligned.
        // we need to centralize the way those cordinates are changed
        this.gameBoard.placePlayer(this.player1.XPos, this.player1.YPos, this.player1);
        this.gameBoard.placePlayer(this.player2.XPos, this.player2.YPos, this.player2);
        
        // const {id:id1, xPos:xPos1, yPos:yPos1} = playerOneInfo;
        // const {id2, xPos2, yPos2} = playerTwoInfo
        // this.player1 = new Player(id1, xPos1, yPos1, this.gameBoard);
        // this.player2 = new Player(id2, xPos2, yPos2, this.gameBoard);
        // this.gameBoard.placePlayer(xPos1, yPos1, this.player1);
        // this.gameBoard.placePlayer(xPos2, yPos2, this.player2);
    }
    
}
const exBoard = new Game (3, new Player(1, 0, 0, this.gameBaord), new Player(2, 0, 1, this.gameBaord))
console.log(exBoard.gameBoard)
