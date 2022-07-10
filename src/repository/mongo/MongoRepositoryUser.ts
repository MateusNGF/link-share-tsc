import { User } from "../../entity";
import RepositoryUser from "../contracts/abstracts/RepositoryUser";


export default class MongoRepositoryUser extends RepositoryUser {
  public findByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  public findByNick(nickname: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  public validAccess(email: string, password: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  public validCredentials(nickname: string, email: string) {
    throw new Error("Method not implemented.");
  }
  public validateDuplicatedNickName(nickname: string) {
    throw new Error("Method not implemented.");
  }
  public updatePassword(userId: string, newPassword: string) {
    throw new Error("Method not implemented.");
  }
  public findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
}