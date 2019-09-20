import Player from './player';
import { IBoard } from './board';

describe('Player', () => {

    // How do i use dependency injection correctly in Jest? I feel like I am not implementing it correctly at all
    let sut : Player
    let instance: Player
    // const sut : Player
    const testId = 1
    let board : IBoard
    // because 
    
    beforeEach(() => {
        var instance = new Player(testId, 1, 1, board);
    });

    it('should return a created player', () => {
        expect(instance).toBeInstanceOf(sut);
    });
});