import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { User } from "../../entity";
import { UserReposiroty } from "../../repository";
import { buildBody, Messager } from "../../utils";
import { typeCustomRequest, typeCustomResponse } from "../../utils/adapter";



export class Access implements IController {

  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const repository = getCustomRepository(UserReposiroty)
      var access: User = new User()

      await access.validAccess(request.body.email, request.body.password)
      access = await repository.validAccess(request.body.email, request.body.password)

      return Messager.sucess(buildBody(access))
    } catch (error) {
      return Messager.error(error)
    }
  }
}