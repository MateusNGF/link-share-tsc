import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { Link, User, Validate } from "../../entity";
import { v4 as uuid } from "uuid";
import { UserRepository, ValidateRepository } from "../../repository";
import { buildBody, InvalidParam, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";
import { hashPassword } from "../../utils/auth";
import { SendEmailValidateCode } from "../../utils/sendEmail/services";

export class Create implements IController {
   async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
      try {
         const repository = getCustomRepository(UserRepository);
         const validateRepository = getCustomRepository(ValidateRepository);

         const userCurrent = new User(request.body);
         userCurrent.password = hashPassword(request.body.password);

         await userCurrent.valid();
         
         validateRepository.nicknameFormatIsValid(userCurrent.nickname);

         userCurrent.nickname = `@${userCurrent.nickname}`

         if (request.body.links && request.body.links.length > 0) {
            var promises = [];
            userCurrent.links = [];
            request.body.links.forEach(async (link: Link) => {
               const linkCurrent = new Link(link);
               // corrigir a validação de url
               promises.push(linkCurrent.valid());
               userCurrent.links.push(linkCurrent);
            });
            await Promise.all(promises).catch((e) => {
               throw new InvalidParam(`${e.message} - (${e._original})`);
            });
         }

         await repository.validCredentials(userCurrent.nickname, userCurrent.email);
         const savedCurrentUser: User = await repository.save(userCurrent);
         const savedValidate: Validate = await validateRepository.save({ uuid: uuid(), owner: savedCurrentUser });

         await SendEmailValidateCode(savedValidate.owner.email, savedValidate.uuid, savedCurrentUser.name);
         return Messenger.success(buildBody(savedCurrentUser));
      } catch (error) {
         return Messenger.error(error);
      }
   }
}
