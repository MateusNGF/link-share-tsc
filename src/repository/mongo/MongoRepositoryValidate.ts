import { Validate } from "../../entity";
import RepositoryValidate from "../contracts/abstracts/RepositoryValidate";

export default class MongoRepositoryValidate extends RepositoryValidate {
  public findByUUID(uuid: string): Promise<Validate> {
    throw new Error("Method not implemented.");
  }
  public removeValidate(validate: Validate): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  public isEmailValid(email: string, uuid: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  public findById(id: string): Promise<Validate> {
    throw new Error("Method not implemented.");
  }
}