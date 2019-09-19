import Player from './player'
import Board from './board'
jest.mock('./player')
jest.mock('./board')


describe('Player', () => {

    let sut: Player
    let instance: Player;
    let testId = 1
    let board : Board
    
    beforeEach(() => {
        instance = new Player(testId, 1, 1, board);
    });

    it('should return a created player', () => {
        expect(instance).toBeInstanceOf(Player);
    });
});