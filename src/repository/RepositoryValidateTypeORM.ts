import { EntityRepository, Repository } from "typeorm";
import { Validate } from "../entity";
import message from "../utils/configs/texts.config";
import { DataNotFound, Unauthorized} from "../utils";
import IRepositoryValidade from "./contracts/IRepositoryValidade";

@EntityRepository(Validate)
export class RepositoryValidadeTypeORM extends Repository<Validate> implements IRepositoryValidade {
   async findByUUID(uuid: string): Promise<Validate> {
      return await this.findOne({ where: { uuid } });
   }
   
   async removeValidate(validate : Validate){
      return await this.remove(validate) ? true  :false
   }

   async isEmailValid(email: string, uuid: string): Promise<boolean> {
      const returnDB = await this.findByUUID(uuid);
      if (!returnDB) throw new DataNotFound("Validação não foi encontrada.");
      if (returnDB.type !== "email") throw new Unauthorized(message.ptbr.entities.validate.errors.invalidType(returnDB.type));
      if (returnDB.uuid !== uuid) throw new Unauthorized("Validação não é valida!");
      this.remove(returnDB);
      return true;
   }
}
