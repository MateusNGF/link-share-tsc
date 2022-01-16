import { getCustomRepository } from "typeorm"

import { IController } from ".."
import { Link, User } from "../../entity"
import message from '../../utils/configs/texts.config'
import { LinkRepository, UserReposiroty } from "../../repository"
import { InvalidCredencial, Messager, ParamExists, typeCustomRequest, typeCustomResponse } from "../../utils"



export class CreateNewLink implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const idCurrentUser = request.header['user']['id'],
        repositoryLink = getCustomRepository(LinkRepository),
        repositoryUser = getCustomRepository(UserReposiroty),
        currentUser: User = await repositoryUser.findById(idCurrentUser),
        newLink: Link = new Link(request.body)

      await newLink.valid()
      if (!currentUser) throw new InvalidCredencial(message.ptbr.entities.user.errors.notFound)
      if (currentUser.links.find((link) => link.url.toString() === newLink.url.toString()))
        throw new ParamExists(message.ptbr.entities.link.errors.duplicated)

      await repositoryLink.save(newLink)

      return Messager.sucess({})
    } catch (error) {
      return Messager.error(error)
    }
  }
}