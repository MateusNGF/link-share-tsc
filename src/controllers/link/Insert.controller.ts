import { getCustomRepository } from "typeorm";

import { IController } from "../contracts";
import { Link, User } from "../../entity";
import message from "../../utils/configs/texts.config";
import { RepositoryLinkTypeORM, RepositoryUserTypeORM } from "../../repository";
import { InvalidCredencial, Messenger, ParamExists, RequestCustom, ResponseCustom } from "../../utils";

export class CreateNewLink implements IController {
   
   private repositoryLink : RepositoryLinkTypeORM;
   private repositoryUser : RepositoryUserTypeORM;
   private userID : number;

   async exec(request: RequestCustom): Promise<ResponseCustom> {
      try {
         this.userID = request.header["user"]["id"]
         this.repositoryLink = getCustomRepository(RepositoryLinkTypeORM)
         this.repositoryUser = getCustomRepository(RepositoryUserTypeORM)
      
         const currentUser: User = await this.repositoryUser.findById(String(this.userID))
         if (!currentUser) throw new InvalidCredencial(message.ptbr.entities.user.errors.notFound);
      
         let newLink: Link = new Link({
            context : request.body.context,
            tag : request.body.tag,
            type: request.body.type
         });
         await newLink.valid()
         
         if (currentUser.links.find(
               (link) => 
                  link.context.toString() === newLink.context.toString() 
                  && link.type.toString() === newLink.type.toString()
               
         )) throw new ParamExists(message.ptbr.entities.link.errors.duplicated);
         
         newLink.owner = currentUser
         await this.repositoryLink.save(newLink);
         
         return Messenger.success({});
      } catch (error) {
         return Messenger.error(error);
      }
   }
}
