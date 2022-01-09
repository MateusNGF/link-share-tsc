import { getCustomRepository } from "typeorm"
import { IController } from ".."
import { User } from "../../entity"
import { UserReposiroty } from "../../repository"
import { LinkRepository } from "../../repository/Link.repository"
import { InvalidCredencial, Messager, ParamExists } from "../../utils"
import { typeCustomRequest, typeCustomResponse } from "../../utils/adapter"



export class CreateNewLink implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const idCurrentUser = request.header['user']['id'],
        repositoryLink = getCustomRepository(LinkRepository),
        repositoryUser = getCustomRepository(UserReposiroty),
        currentUser: User = await repositoryUser.findById(idCurrentUser)

      if (!currentUser) throw new InvalidCredencial("User not found.")
      if (currentUser.links.find((link) => link.url.toString() === request.body.url.toString()))
        throw new ParamExists("new link has exist in your collection")

      const newLink = repositoryLink.save({
        type: request.body.type,
        url: request.body.url,
        owner: currentUser,
      })

      return Messager.sucess({})
    } catch (error) {
      return Messager.error(error)
    }
  }
}