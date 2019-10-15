export interface IGameDAO {
  find(id: number): string;
}
// data access object, takes care
// 
export class GameDAO implements IGameDAO {
  /* ? */
  find(id): string{
    return 'done'
  }
}
