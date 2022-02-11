import { getCustomRepository } from "typeorm";
import { User } from "../../entity";
import { UserRepository } from "../../repository";
import { BadRequest, buildBody, DataNotFound, InvalidParam, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";
import { IController } from "../protocols";
import message from "../../utils/configs/texts.config";

export class Update implements IController {
   async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
      try {
         const repository = getCustomRepository(UserRepository);
         let userCurrent: User = await repository.findById(request.header["user"]["id"]);
         if (!userCurrent) throw new DataNotFound(message.ptbr.entities.user.errors.notFound);

         for (const key in request.body) {
            if (!Object.prototype.hasOwnProperty.call(userCurrent, key)) {
               throw new InvalidParam(`A propriedade ${key} não existe.`);
            }
         }
         const userUpdate: User = new User(request.body);
         await userUpdate.valid(["name"]);
         await repository.validCredentials(userUpdate.nickname, userUpdate.email);

         if ((await repository.update(userCurrent.id, userUpdate)).affected > 0) {
            userCurrent = await repository.findById(request.header["user"]["id"]);
         } else {
            throw new BadRequest(message.ptbr.entities.user.errors.updateFailed);
         }
         return Messenger.success(buildBody(userCurrent));
      } catch (error) {
         return Messenger.error(error);
      }
   }
}
