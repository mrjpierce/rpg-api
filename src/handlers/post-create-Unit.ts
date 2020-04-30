import "reflect-metadata";
import { injectable, inject } from "inversify";
import { HTTPHandler, HTTPEvent, HTTPResult } from "@ifit/fleece";
import { TYPES } from "../types";
import { IUnitDAO } from "../dao/unit-dao";
import { IUnitDO } from "../do/unit-do";

export interface IPostUnitEvent extends HTTPEvent<IUnitDO, null, null> {}

@injectable()
export class PostUnitHandler extends HTTPHandler<IUnitDO, null, null> {
  constructor(@inject(TYPES.IUnitDAO) private unitDAO: IUnitDAO) {
    super();
  }
  public async run(event: IPostUnitEvent): Promise<HTTPResult> {
    const newDoc = event.processed.body as IUnitDO;

    const createdDoc = await this.unitDAO.create(newDoc);
    return {
      body: createdDoc,
      statusCode: 200
    };
  }
}
