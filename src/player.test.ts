import {readyPlayerOne} from './player'

test('player is created', () => {
    expect(readyPlayerOne.playerId).toBe(1)
})

test('move should should return player', () => {
    expect(readyPlayerOne.move(readyPlayerOne, 11)).toBeTruthy()
})

test('move should return upated position', () => {
    expect(readyPlayerOne.move(readyPlayerOne, 12)).toEqual({1})
})