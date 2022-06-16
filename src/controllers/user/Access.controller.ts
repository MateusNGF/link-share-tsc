import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { User } from "../../entity";
import { RepositoryUserTypeORM } from "../../repository";
import { buildBody, Messenger, schemas, RequestCustom, ResponseCustom } from "../../utils";



export class AccessUserAcountController implements IController {
  async exec(request: RequestCustom): Promise<ResponseCustom> {
    try {
      const repository = getCustomRepository(RepositoryUserTypeORM);
      var access: User = new User()

      await schemas.user.methods.validProp("email", request.body.email)
      access = await repository.validAccess(request.body.email, request.body.password)

      return Messenger.success(buildBody(access));
    } catch (error) {
      return Messenger.error(error);
    }
  }
}