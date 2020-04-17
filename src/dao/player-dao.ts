import "reflect-metadata";
import Player, { IPlayer } from "../player";
import { injectable, inject } from "inversify";
import { DataAccessObject } from "@ifit/mongoose-dao";
import { IPlayerDO } from "../do/player-do";

export interface IPlayerDAO extends DataAccessObject<IPlayerDO, IPlayer> {}
@injectable()
export class PlayerDAO extends DataAccessObject<IPlayerDO, IPlayer> implements IPlayerDAO {
  protected targetClass = Player;
  constructor(@inject(TYPES.IPlayerModel) protected model: IPlayerModel) {
    super();
  }
}
