import { Request, Response } from "express"
import { getCustomRepository, getRepository } from "typeorm"
import { IController } from ".."
import { Link, User } from "../../entity"
import { UserReposiroty } from "../../repository"
import { LinkRepository } from "../../repository/Link.repository"
import { DataNotFound, Messager, Unauthorized } from "../../utils"
import { typeCustomRequest, typeCustomResponse } from "../../utils/adapter"

export class DeleteLinkById implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const idCurrentUser = request.header['user']['id'],
        idLinkForDelete = request.params['idLink'],
        repositoryUser = getCustomRepository(UserReposiroty),
        repositoryLink = getCustomRepository(LinkRepository)


      const currentUser: User = await repositoryUser.findById(idCurrentUser),
        currentLinkUser = currentUser.links.find(
          (link: Link) => link.id_link.toString() === idLinkForDelete.toString()
        )

      if (!currentLinkUser) throw new Unauthorized("Not Found, Action Denied ... ")

      await repositoryLink.remove(currentLinkUser)

      return Messager.sucess({})
    } catch (error) {
      return Messager.error(error)
    }
  }
}