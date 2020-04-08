import Player, { IPlayer } from "./player";

describe("player.ts", () => {
  let player: IPlayer;

  beforeEach(() => {
    player = Player.Build(2, { x: 0, y: 0 });
  });
  describe("constructor of Player Class", () => {
    it("creates an instance of the Player of the unit class", () => {
      expect(player).toBeInstanceOf(Player);
    });
  });
});
