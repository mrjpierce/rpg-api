interface IPlayer {
    playerId: number;
    playerPosition: number;
    // I was thinking this would just be the cordinates of a combination of two nums, one for x and y axis
    move(player: IPlayer, newPosition: number) : IPlayer;
}

class Player implements IPlayer {
    constructor(public playerId: number, ) {}
    playerPosition: number;
    // will need to make it so that when I genearte a player I can generate them on different positions on the board
    move(player: Player, newPosition : number) : Player {
        this.playerPosition = newPosition
        return player
    }
}

export const readyPlayerOne = new Player(1)