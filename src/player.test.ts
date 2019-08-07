import {readyPlayerOne} from './player'

test('player is created', () => {
    expect(readyPlayerOne.playerId).toBe(1)
})

test('move should should return player', () => {
    expect(readyPlayerOne.move(readyPlayerOne, 11)).toBeTruthy()
})

// additional tests:
//