import Player from './player'
jest.mock('./player')


describe('Player', () => {
    let instance: Player;
    let testId = 1
    
    beforeEach(() => {
        instance = new Player(testId, 1, 1);
    });

    it('should return a created player', () => {
        expect(instance).toBeInstanceOf(Player);
    });
});