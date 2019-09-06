import BoardCreator from './board'
import Player from './player'
jest.mock('./board')


describe('BoardCreation in ./board', () => {
    let instnace: BoardCreator;
    const testArrs = 3;
    const testInd = 3;
    //need to favor the strictest declaration possible, most should be const
    let instance2: Player;

    beforeEach(() => {
        instance2 = new Player(1, 1, 1);
        instnace = new BoardCreator(testArrs, testInd);
    });
    it('should be an instance of BoardCreation', () => {
        expect(instnace).toBeInstanceOf(BoardCreator);
    });
});
