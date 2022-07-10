import { Link } from "../../entity";
import RepositoryLink from "../contracts/abstracts/RepositoryLink";


export default class MongoRepositoryLink extends RepositoryLink {
  public delete(id_link: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  public findById(id: string): Promise<Link> {
    throw new Error("Method not implemented.");
  }  
}