import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { User } from "../../entity";
import { UserRepository,ValidateRepository } from "../../repository";
import { buildBody, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class Refresh implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const idCurrentUser = request.header['user']['id']
      const repository = getCustomRepository(UserRepository);

      const currentUserUpdated: User = await repository.findById(idCurrentUser)

      return Messenger.success(buildBody(currentUserUpdated));
    } catch (error) {
      return Messenger.error(error);
    }
  }
}