import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { User } from "../../entity";
import { UserRepository } from "../../repository";
import { buildBody, Messenger, schemas, typeCustomRequest, typeCustomResponse } from "../../utils";



export class Access implements IController {

  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const repository = getCustomRepository(UserRepository);
      var access: User = new User()

      await schemas.user.methods.validProp("email", request.body.email)
      access = await repository.validAccess(request.body.email, request.body.password)

      return Messenger.success(buildBody(access));
    } catch (error) {
      return Messenger.error(error);
    }
  }
}