interface IPlayer {
    // only be as specific as you need to be, obviously its the player, do need the playerId and stuff
    id: number;
    position: number;
    // I was thinking this would just be the cordinates of a combination of two nums, one for x and y axis
    move(player: IPlayer, newPosition: number) : IPlayer;
}

class Player implements IPlayer {
    constructor(public playerId: number, ) {}
    position: number;
    // will need to make it so that when I genearte a player I can generate them on different positions on the board
    move(player: Player, newPosition : number) : Player {
        this.position = newPosition
        return Player
        // need to think about what needs to be returned, do we need to return the entire player object? 
    }
}

export const readyPlayerOne = new Player(1)

// export interfaces and class and ins