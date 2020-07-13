import "reflect-metadata";
import { injectable, inject } from "inversify";
import { IDataAccessObject, DataAccessObject } from "@ifit/mongoose-dao";
import { IUnitDO } from "../do/unit-do";
import { IUnitModel } from "../models/unit-model";
import { Unit } from "../unit";
import { TYPES } from "../types";

export interface IUnitDAO extends IDataAccessObject<IUnitDO, Unit> {}
@injectable()
export class UnitDAO extends DataAccessObject<IUnitDO, Unit> implements IUnitDAO {
  protected targetClass = Unit;
  constructor(@inject(TYPES.IUnitModel) protected model: IUnitModel) {
    super();
  }
}
