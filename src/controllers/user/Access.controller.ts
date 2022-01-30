import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { User } from "../../entity";
import { UserReposiroty } from "../../repository";
import { buildBody, Messager, schemas, typeCustomRequest, typeCustomResponse } from "../../utils";



export class Access implements IController {

  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const repository = getCustomRepository(UserReposiroty)
      var access: User = new User()

      await schemas.user.methods.validProps(["email"], request.body)
      access = await repository.validAccess(request.body.email, request.body.password)

      return Messager.sucess(buildBody(access))
    } catch (error) {
      return Messager.error(error)
    }
  }
}