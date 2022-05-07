import { getCustomRepository } from "typeorm";

import { IController } from "..";
import { Link, User } from "../../entity";
import message from "../../utils/configs/texts.config";
import { LinkRepository, UserRepository } from "../../repository";
import { InvalidCredencial, Messenger, ParamExists, typeCustomRequest, typeCustomResponse } from "../../utils";

export class CreateNewLink implements IController {
   
   private repositoryLink : LinkRepository;
   private repositoryUser : UserRepository;
   private userID : number;

   async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
      try {
         this.userID = request.header["user"]["id"]
         this.repositoryLink = getCustomRepository(LinkRepository)
         this.repositoryUser = getCustomRepository(UserRepository)
      
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
