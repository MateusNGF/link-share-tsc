import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { Link, User } from "../../entity";
import { UserReposiroty } from "../../repository";
import { userRouter } from "../../routes";
import { buildBody, File, Messager } from "../../utils";
import { typeCustomRequest, typeCustomResponse } from "../../utils/adapter";


export class Create implements IController {

  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const repository = getCustomRepository(UserReposiroty)

      const userCurrent = new User(request.body)

      await userCurrent.validRegister()
      await repository.validCredencials(userCurrent.nickname, userCurrent.email)

      if (request.body.links && request.body.links.length > 0) {
        userCurrent.links = []
        request.body.links.forEach((link: Link) => {
          const linkCurrent = new Link()

          linkCurrent.type = link.type
          linkCurrent.url = link.url

          userCurrent.links.push(linkCurrent)
        })
      }
      const savedCurrentUser: User = await repository.save(userCurrent)
      return Messager.sucess(buildBody(savedCurrentUser))
    } catch (error) {
      return Messager.error(error)
    }
  }
}