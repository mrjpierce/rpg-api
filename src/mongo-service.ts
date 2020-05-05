import { injectable } from "inversify";
import * as mongoose from "mongoose";
export interface IMongoService {
  connect(): Promise<void>;
}
@injectable()
export class MongoService {
  public async connect(): Promise<void> {
    if (mongoose.connection.readyState !== 1) {
      console.info("Starting to get mongo connection");
      const uri = `mongodb://localhost:27017/rpg-api`;
      (mongoose as any).Promise = global.Promise;
      mongoose.connection.on("error", error => console.error("Connection Error", { error }));
      try {
        await mongoose.connect(uri);
      } catch (error) {
        console.error("Mongoose error", { error });
        throw error;
      }
      console.info("Got mongo connection");
    }
  }
}
