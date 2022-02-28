import { EntityRepository, Repository } from "typeorm";

import { User } from "../entity";
import message from "../utils/configs/texts.config";
import { InvalidCredencial, DataNotFound, ParamExists, Unauthorized } from "../utils";
import { comparePassword } from "../utils/auth";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
   public async findByEmail(email: string): Promise<User> {
      return await this.findOne({ where: { email } });
   }

   public async findByNick(nickname: string): Promise<User> {
      return await this.findOne({ where: { nickname } });
   }
   
   public async findById(id: string): Promise<User> {
      const currentUserFound: User = await this.findOne({ id });
      if (!currentUserFound) throw new DataNotFound(message.ptbr.entities.user.errors.notFound);
      return currentUserFound;
   }

   public async validAccess(email: string, password: string): Promise<User> {
      const returnDB = await this.findByEmail(email);
      if (!returnDB) throw new InvalidCredencial(message.ptbr.entities.user.errors.notFound);
      if (!returnDB.verified) throw new Unauthorized(message.ptbr.entities.user.errors.notVerified(returnDB.email));
      if (!(await comparePassword(password, returnDB.password))) throw new Unauthorized(message.ptbr.entities.user.errors.incorrect("Senha"));
      return returnDB;
   }

   public async validCredentials(nickname: string, email: string) {
      if (await this.findByEmail(email)) throw new ParamExists(message.ptbr.entities.user.errors.duplicated("E-mail"));
      if (await this.findByNick(nickname)) throw new ParamExists(message.ptbr.entities.user.errors.duplicated("Nickname"));
   }
}
