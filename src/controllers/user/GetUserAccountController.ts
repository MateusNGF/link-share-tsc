import { getCustomRepository } from "typeorm";
import { RepositoryUserTypeORM } from "../../repository";
import message from "../../utils/configs/texts.config";
import { buildBody, Messenger, RequestCustom, ResponseCustom } from "../../utils";
import { NotFound } from "../../utils/errors/custom/NotFound";
import { IController } from "../protocols";


export class GetUserAccountController implements IController {
  async exec(request: RequestCustom): Promise<ResponseCustom> {
    try {
      const repository = getCustomRepository(RepositoryUserTypeORM);      
      let foundedUser = await repository.findByNick(request.params.nickname) // busca por nickname
      if (!foundedUser) { throw new NotFound(message.ptbr.entities.user.errors.notFound) }
      return Messenger.success(buildBody(foundedUser, false));
    } catch (error) {
      return Messenger.error(error);
    }
  }
}