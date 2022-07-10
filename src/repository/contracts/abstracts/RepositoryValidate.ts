import { Validate } from "../../../entity";
import BaseRepository from "./BaseRepository";

export default abstract class RepositoryValidate extends BaseRepository<Validate>{
  public abstract findByUUID(uuid: string): Promise<Validate>
  public abstract removeValidate(validate : Validate) : Promise<boolean>
  public abstract isEmailValid(email: string, uuid: string): Promise<boolean>
}