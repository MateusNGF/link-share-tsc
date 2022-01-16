import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { Link, User } from "../../entity";
import { UserReposiroty } from "../../repository";
import { buildBody, InvalidParam, Messager, typeCustomRequest, typeCustomResponse } from "../../utils";


export class Create implements IController {

  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const repository = getCustomRepository(UserReposiroty)

      const userCurrent = new User(request.body)

      await userCurrent.valid()

      if (request.body.links && request.body.links.length > 0) {
        var promises = []; userCurrent.links = []

        request.body.links.forEach(async (link: Link) => {
          const linkCurrent = new Link(link)

          promises.push(linkCurrent.valid())
          userCurrent.links.push(linkCurrent)
        })
        await Promise.all(promises).catch((e) => { throw new InvalidParam(`${e.message} - (${e._original})`) });
      }

      await repository.validCredencials(userCurrent.nickname, userCurrent.email)
      const savedCurrentUser: User = await repository.save(userCurrent)
      return Messager.sucess(buildBody(savedCurrentUser))
    } catch (error) {
      return Messager.error(error)
    }
  }
}