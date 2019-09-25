import Player, { IPlayer } from './player';
import Board, { IBoard } from './board';

// Task 3: Write tests for move function on player

describe('Player', () => {
    let player: IPlayer;
    let board: IBoard;
    
    beforeEach(() => {
        board = new Board(3); //TODO: https://jestjs.io/docs/en/es6-class-mocks, jest.fn
        player = Player.Build(1, 2, 2, board);
    });

    describe('move', () => {
        it('should change XPos to correct value', () => {
            // Arrange
            // None

            // Act
            player.move(2, 3);

            // Assert
            expect(player.XPos).toBe(2);
        });
    });
});
