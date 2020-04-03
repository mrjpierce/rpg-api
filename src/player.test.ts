import Player, { IPlayer, Monster, IMonster } from "./player";

describe("player.ts", () => {
  let player: IPlayer;
  let monster: IMonster;

  beforeEach(() => {
    player = Player.Build(2, { x: 0, y: 0 });
    monster = Monster.Build(4, { x: 0, y: 1 });
  });
  describe("constructor of Player Class", () => {
    it("creates an instance of the Player of the unit class", () => {
      expect(player).toBeInstanceOf(Player);
    });
  });
  describe("constructor of Monster Class", () => {
    it("creates an instance of the Monster of the unit class", () => {
      expect(monster).toBeInstanceOf(Monster);
    });
  });
});

// abstract class testing
//
