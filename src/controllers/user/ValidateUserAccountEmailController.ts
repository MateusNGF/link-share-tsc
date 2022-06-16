import { getCustomRepository } from "typeorm";
import { IController } from "../contracts";
import { User } from "../../entity";
import { RepositoryUserTypeORM, RepositoryValidadeTypeORM } from "../../repository";
import { Messenger, schemas, RequestCustom, DataNotFound, ResponseCustom } from "../../utils";
import message from "../../utils/configs/texts.config";

export class ValidateUserAccountEmailController implements IController {
   async exec(request: RequestCustom): Promise<ResponseCustom> {
      try {
         await schemas.validate.methods.validProps(["email", "uuid"], request.body);

         const repository = getCustomRepository(RepositoryUserTypeORM);
         const validateRepository = getCustomRepository(RepositoryValidadeTypeORM);

         var validateUser: User = new User();
         validateUser = await repository.findByEmail(request.body.email);
         if (!validateUser) throw new DataNotFound(message.ptbr.entities.user.errors.notFound);

         await validateRepository.isEmailValid(request.body.email, request.body.uuid);
         await repository.update(validateUser.id, { verified: true });
   
         return Messenger.success({});
      } catch (error) {
         return Messenger.error(error);
      }
   }
}
