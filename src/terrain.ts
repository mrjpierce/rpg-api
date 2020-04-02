const enum TerrainType {
  "Mountain",
  "Forest",
  "Water",
  "Desert"
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

export class WaterTerrain implements ITerrain {
  public readonly type: TerrainType = TerrainType.Water;
  isPassable: true;
  constructor() {}
}

export class DesertTerrain implements ITerrain {
  public readonly type: TerrainType = TerrainType.Desert;
  isPassable: true;
  constructor() {}
}
