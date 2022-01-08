import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { User } from "../../entity";
import { UserReposiroty } from "../../repository";
import { buildBody, Messager } from "../../utils";
import { typeCustomRequest, typeCustomResponse } from "../../utils/adapter";

export class Refresh implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const idCurrentUser = request.header['user']['id']
      const repository = getCustomRepository(UserReposiroty)

      const currentUserUpdated : User = await repository.findById(idCurrentUser)

      return Messager.sucess(buildBody(currentUserUpdated))
    } catch (error) {
      return Messager.error(error)
    }
  }
}