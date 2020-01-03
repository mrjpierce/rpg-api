import Board from "./board";
// import Player from "./player";
jest.mock("./board");

describe("BoardCreation in ./board", () => {
  let instance: Board;
  const testArrs = 3;
  //need to favor the strictest declaration possible, most should be const
  // let instance2: Player;

  beforeEach(() => {
    // instance2 = Player.Build(0, { x: 0, y: 0 });
    instance = new Board(testArrs);
  });
  it("should be an instance of Board", () => {
    expect(instance).toBeInstanceOf(Board);
  });
});
