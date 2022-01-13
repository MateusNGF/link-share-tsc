import { getCustomRepository } from "typeorm";
import { IController } from "..";
import { Link, User } from "../../entity";
import { UserReposiroty } from "../../repository";
import { buildBody, Messager } from "../../utils";
import { typeCustomRequest, typeCustomResponse } from "../../utils/adapter";


export class Create implements IController {

  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const repository = getCustomRepository(UserReposiroty)
      await repository.validCredencials(request.body.nickname, request.body.email)

      const userCurrent = new User()

      userCurrent.name = request.body.name
      userCurrent.email = request.body.email
      userCurrent.nickname = request.body.nickname
      userCurrent.password = request.body.password
      userCurrent.description = request.body.description
      userCurrent.pic_profile = `${process.env.colletionPicProfiles}/${request.file.filename}`

      let newLinksCurrentUser = JSON.parse(request.body.links)
      if (newLinksCurrentUser && newLinksCurrentUser.length > 0) {
        console.log(newLinksCurrentUser)
        userCurrent.links = []
        newLinksCurrentUser.forEach((link: Link) => {
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