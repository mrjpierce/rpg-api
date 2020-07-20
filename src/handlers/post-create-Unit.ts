import "reflect-metadata";

import { injectable, inject } from "inversify";
import { HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IUnitDAO } from "../dao/unit-dao";
import { IUnitDO } from "../do/unit-do";
import { IMongoService } from "../mongo-service";
import { BaseHandler } from "./base-handler";

export interface IPostUnitEvent extends HTTPEvent<IUnitDO, null, null> {}

@injectable()
export class PostUnitHandler extends BaseHandler<IUnitDO, null, null> {
  constructor(
    @inject(TYPES.IUnitDAO) private unitDAO: IUnitDAO,
    @inject(TYPES.IMongoService) protected mongoService: IMongoService
  ) {
    super(mongoService, "PostUnitHandler");
  }

  public async run(event: IPostUnitEvent): Promise<HTTPResult> {
    const newDoc = event.processed.body as IUnitDO;
    const createdDoc = await this.unitDAO.create(newDoc);
    return HTTPResult.OK({ body: createdDoc });
  }
}
