import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { User } from "../../entity";
import { RepositoryUserTypeORM} from "../../repository";
import { buildBody, Messenger, RequestCustom, ResponseCustom } from "../../utils";

/**
 * DEPRECIANDO ESTA ROTA.
 *  
 */
export class Refresh implements IController {
  async exec(request: RequestCustom): Promise<ResponseCustom> {
    try {
      const idCurrentUser = request.header['user']['id']
      const repository = getCustomRepository(RepositoryUserTypeORM);

      const currentUserUpdated: User = await repository.findById(idCurrentUser)

      return Messenger.success(buildBody(currentUserUpdated));
    } catch (error) {
      return Messenger.error(error);
    }
  }
}