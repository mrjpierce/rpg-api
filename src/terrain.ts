export interface ITerrain {
    terrainType: string;
}

export default class Terrain implements ITerrain {
    constructor(public terrainType: string){}
}