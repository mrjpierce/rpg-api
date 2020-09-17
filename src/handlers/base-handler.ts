import "reflect-metadata";

import { HTTPError, HTTPHandler } from "@ifit/fleece";
import { injectable } from "inversify";
import { IMongoService } from "../mongo-service";

@injectable()
export abstract class BaseHandler<TBaseBody, TBasePath extends object, TBaseQuery extends object> extends HTTPHandler<
  TBaseBody,
  TBasePath,
  TBaseQuery
> {
  constructor(protected mongoService: IMongoService, protected logIdentifier: string) {
    super();
  }

  public async preRun(): Promise<void> {
    const handlerName = `${this.logIdentifier}.preRun`;
    try {
      console.profile(`${handlerName} - mongo.connect`);
      await this.mongoService.connect();
      console.profile(`${handlerName} - mongo.connect`);
    } catch (ex) {
      console.error(`${handlerName} - Error connecting to mongo`);
      throw HTTPError.InternalServerError("Internal Server Error");
    }
  }
}
