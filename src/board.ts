interface IBoard {
    boardId: number;
    boardLayout: object;
}

class Board implements IBoard {
   constructor (public boardId: number) {};
    boardLayout = {
        11: false,
        12: false,
        13: false,
        21: false,
        22: false,
        23: false,
        31: false,
        32: false,
        33: false
    }
}

export const board1 = new Board (1)