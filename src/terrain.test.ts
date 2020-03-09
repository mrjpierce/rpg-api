import { MountainTerrain, ITerrain } from "./terrain";
// import ForestTerrian from "./terrain";

describe("terrain.ts", () => {
  let mountainTerrainInstance: ITerrain;
  describe("MountainTerrain", () => {
    it("creats an instance of the MountainTerrain class", () => {
      mountainTerrainInstance = new MountainTerrain();
      expect(mountainTerrainInstance).toBeInstanceOf(MountainTerrain);
    });
  });
});
