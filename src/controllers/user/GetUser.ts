import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repository";
import message from "../../utils/configs/texts.config";
import { buildBody, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";
import { NotFound } from "../../utils/errors/custom/NotFound";
import { IController } from "../protocols";


export class GetUser implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const repository = getCustomRepository(UserRepository);      
      let foundedUser = await repository.findByNick(request.params.nickname) // busca por nickname
      if (!foundedUser) { throw new NotFound(message.ptbr.entities.user.errors.notFound) }
      return Messenger.success(buildBody(foundedUser, false));
    } catch (error) {
      return Messenger.error(error);
    }
  }
}