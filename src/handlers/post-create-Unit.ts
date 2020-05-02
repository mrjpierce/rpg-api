import "reflect-metadata";

import { injectable, inject } from "inversify";
import { HTTPHandler, HTTPEvent, HTTPResult, HTTPError } from "@ifit/fleece";
import { TYPES } from "../types";
import { IUnitDAO } from "../dao/unit-dao";
import { IUnitDO } from "../do/unit-do";
import { IMongoService } from "../mongo-service";

export interface IPostUnitEvent extends HTTPEvent<IUnitDO, null, null> {}

@injectable()
export class PostUnitHandler extends HTTPHandler<IUnitDO, null, null> {
  constructor(
    @inject(TYPES.IUnitDAO) private unitDAO: IUnitDAO,
    @inject(TYPES.IMongoService) private mongoService: IMongoService
  ) {
    super();
    console.log(unitDAO);
  }
  public async preRun(): Promise<void> {
    const handlerName = "PostUnitHandler";
    try {
      console.profile(`${handlerName} - mongo.connect`);
      await this.mongoService.connect();
      console.profile(`${handlerName} - mongo.connect`);
    } catch (ex) {
      console.error(`${handlerName} - Error connecting to mongo`);
      throw HTTPError.InternalServerError("Internal Server Error");
    }
  }

  public async run(event: IPostUnitEvent): Promise<HTTPResult> {
    const newDoc = event.processed.body as IUnitDO;
    const createdDoc = await this.unitDAO.create(newDoc);
    return HTTPResult.OK({ body: createdDoc });
  }
}
// baseHandler set up so we don't have to run a preRun for the connect
// FOCUS on trying to make sure that every commit is compliable, gonna be painful but thats the right way
