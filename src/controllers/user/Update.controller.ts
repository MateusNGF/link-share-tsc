import { getCustomRepository } from "typeorm";
import { User } from "../../entity";
import { UserReposiroty } from "../../repository";
import { buildBody, DataNotFound, Messager, typeCustomRequest, typeCustomResponse } from "../../utils";
import { IController } from "../protocols";
import message from '../../utils/configs/texts.config'



export class Update implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const repository = getCustomRepository(UserReposiroty)
      const userCurrent: User = await repository.findById(request.header['user']['id'])
      if (!userCurrent) throw new DataNotFound(message.ptbr.entities.user.errors.notFound)

      const userUpdate: User = new User(request.body)
      await userUpdate.valid()
      await repository.validCredencials(userUpdate.nickname, userUpdate.email)

      const savedCurrentUser = await repository.update(userCurrent, userUpdate)
      return Messager.sucess(savedCurrentUser)
    } catch (error) {
      return Messager.error(error)
    }
  }
}