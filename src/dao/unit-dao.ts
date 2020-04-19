import "reflect-metadata";
import { injectable, inject } from "inversify";
import { DataAccessObject } from "@ifit/mongoose-dao";
import { IUnitDO } from "../do/unit-do";
import { IUnitModel } from "../models/unit-model";
import { IUnit, Unit } from "../unit";
import { TYPES } from "../types";

export interface IUnitDAO extends DataAccessObject<IUnitDO, IUnit> {}
@injectable()
export class UnitDAO extends DataAccessObject<IUnitDO, IUnit> implements IUnitDAO {
  protected targetClass = Unit;
  constructor(@inject(TYPES.IUnitModel) protected model: IUnitModel) {
    super();
  }
}
