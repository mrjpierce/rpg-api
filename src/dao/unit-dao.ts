import "reflect-metadata";
import { injectable, inject } from "inversify";
import { DataAccessObject } from "@ifit/mongoose-dao";
import { IUnitDO } from "../do/player-do";
import { IPlayerModel } from "../models/player-model";
import { IUnit } from "../unit";

export interface IUnitDAO extends DataAccessObject<IUnitDO, IUnit> {}
@injectable()
export class PlayerDAO extends DataAccessObject<IUnitDO, IUnit> implements IUnitDAO {
  protected targetClass = Unit;
  constructor(@inject(TYPES.IPlayerModel) protected model: IPlayerModel) {
    super();
  }
}
