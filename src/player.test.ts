import {readyPlayerOne} from './player'

test('player is created', () => {
    expect(readyPlayerOne.playerId).toBe(1)
})

test('player position should start at 11', () => {
    expect(readyPlayerOne.move(readyPlayerOne, 11)).toBeTruthy()
})