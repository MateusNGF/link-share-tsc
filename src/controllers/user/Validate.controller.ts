import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { User } from "../../entity";
import { UserRepository, ValidateRepository } from "../../repository";
import { Messenger, schemas, RequestCustom, DataNotFound, ResponseCustom } from "../../utils";
import message from "../../utils/configs/texts.config";

export class ValidateEmail implements IController {
   async exec(request: RequestCustom): Promise<ResponseCustom> {
      try {
         await schemas.validate.methods.validProps(["email", "uuid"], request.body);

         const repository = getCustomRepository(UserRepository);
         const validateRepository = getCustomRepository(ValidateRepository);

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
