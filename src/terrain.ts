const enum TerrainType {
  "Mountain",
  "Forest"
}

export interface ITerrain {
  isPassable: boolean;
  type: TerrainType;
}

export class MountainTerrain implements ITerrain {
  public readonly type: TerrainType = TerrainType.Mountain;
  isPassable: true;
  constructor() {}
}

export class ForestTerrain implements ITerrain {
  public readonly type: TerrainType = TerrainType.Forest;
  isPassable: true;
  constructor() {}
}

// Task 2: Define water and desert terrains and isPassible for all classes
