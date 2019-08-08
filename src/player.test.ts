import {readyPlayerOne} from './player'


test('player is created', () => {
    expect(readyPlayerOne.playerId).toBe(1);
    // pull out the magic numbers and set a variable that is describing of what the number should be
    // SELF DESCRIBING CODE!!!
});

// first test should be the class 

test('move should should return player', () => {
    expect(readyPlayerOne.move(readyPlayerOne, 11)).toBeTruthy();
});

// additional tests:
//