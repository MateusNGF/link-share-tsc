import { getCustomRepository } from "typeorm";
import { User } from "../../entity";
import { UserReposiroty } from "../../repository";
import { BadRequest, buildBody, DataNotFound, InvalidParam, Messager, typeCustomRequest, typeCustomResponse } from "../../utils";
import { IController } from "../protocols";
import message from '../../utils/configs/texts.config'
import { hashPassword } from "../../utils/auth";



export class Update implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      
      const repository = getCustomRepository(UserReposiroty)
      let userCurrent: User = await repository.findById(request.header['user']['id'])
      if (!userCurrent) throw new DataNotFound(message.ptbr.entities.user.errors.notFound)

      for (const key in request.body) {
       if (!Object.prototype.hasOwnProperty.call(userCurrent, key)) {
         throw new InvalidParam(`A propriedade ${key} não existe.`)
       }
      }
      const userUpdate: User = new User(request.body)

      await userUpdate.valid(["name"])
      await repository.validCredencials(userUpdate.nickname, userUpdate.email)

      if ((await repository.update(userCurrent.id, userUpdate)).affected > 0) {
        userCurrent = await repository.findById(request.header['user']['id'])
      } else {
        throw new BadRequest(message.ptbr.entities.user.errors.updadeFailed)
      }
      return Messager.sucess(buildBody(userCurrent))
    } catch (error) {
      return Messager.error(error)
    }
  }
}