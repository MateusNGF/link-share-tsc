import { getCustomRepository } from "typeorm";

import { IController } from "../contracts";
import { Link, User } from "../../entity";
import message from "../../utils/configs/texts.config";
import { RepositoryLinkTypeORM, RepositoryUserTypeORM } from "../../repository";
import { Messenger, RequestCustom, ResponseCustom, Unauthorized } from "../../utils";

export class DeleteLinkUserAccountController implements IController {
   async exec(request: RequestCustom): Promise<ResponseCustom> {
      try {
         const idCurrentUser = request.header["user"]["id"],
            idLinkForDelete = request.params["idLink"],
            repositoryUser = getCustomRepository(RepositoryUserTypeORM),
            repositoryLink = getCustomRepository(RepositoryLinkTypeORM);

         const currentUser: User = await repositoryUser.findById(idCurrentUser);
         const currentLinkUser = currentUser.links.find((link: Link) => link.id_link.toString() === idLinkForDelete.toString());
         if (!currentLinkUser) throw new Unauthorized(message.ptbr.entities.link.errors.notFound);

         await repositoryLink.remove(currentLinkUser);

         return Messenger.success({});
      } catch (error) {
         return Messenger.error(error);
      }
   }
}
