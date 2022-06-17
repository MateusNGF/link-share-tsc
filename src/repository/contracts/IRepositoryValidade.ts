import { Validate } from "../../entity"

export default interface IRepositoryValidade {
  findByUUID(uuid: string): Promise<Validate>
  removeValidate(validate : Validate) : Promise<boolean>
  isEmailValid(email: string, uuid: string): Promise<boolean>
}