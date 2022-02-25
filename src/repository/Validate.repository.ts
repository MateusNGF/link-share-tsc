import { EntityRepository, Repository } from "typeorm";
import { Validate } from "../entity";
import message from "../utils/configs/texts.config";
import { DataNotFound, ParamExists, Unauthorized, InvalidFormat} from "../utils";

@EntityRepository(Validate)
export class ValidateRepository extends Repository<Validate> {
   async findByUUID(uuid: string): Promise<Validate> {
      return await this.findOne({ where: { uuid } });
   }
     /**
      * Verifica se tem carecter especial ou espaço no nickname
      * 
      */
   public nicknameFormatIsValid = (nickname:string) =>{
      if(new RegExp(/^[^\\s-]$/).test(nickname))  throw new InvalidFormat(message.ptbr.entities.user.validation.nickname.invalidFormat)
   }
   async isEmailValid(email: string, uuid: string): Promise<boolean> {
      const returnDB = await this.findByUUID(uuid);
      if (!returnDB) throw new DataNotFound(message.ptbr.entities.validate.errors.notFound);
      if (returnDB.type !== "email") throw new Unauthorized(message.ptbr.entities.validate.errors.invalidType(returnDB.type));
      if (returnDB.uuid !== uuid) throw new Unauthorized(message.ptbr.entities.validate.errors.invalidUUID);
      this.remove(returnDB);
      return true;
   }
}
