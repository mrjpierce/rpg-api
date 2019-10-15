import { HTTPHandler, HTTPEvent, HTTPResult } from "@ifit/fleece";
import { injectable } from "inversify";

export interface IGetGameQuery {
  name?: string;
}

export interface IGetGamePath {
  id: string;
}

export interface IGetGameEvent extends HTTPEvent<null, IGetGamePath, IGetGameQuery> {

}

@injectable()
export class GetGameHandler extends HTTPHandler<null, IGetGamePath, IGetGameQuery> {
  /* ? */
  public async run(event: IGetGameEvent): Promise<HTTPResult> {
    return HTTPResult.OK({body: null});
  }
  // event gets passed around to all the life cycle methods, 
  
}