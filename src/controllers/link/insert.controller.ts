import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Link, User } from "../../entity"
import { InvalidCredencial, ParamExists, Sender } from "../../utils"



export const insert = async (req: Request, res: Response) => {
  try {

    const idUser = req.header['user']['id']
    const repositoryLink = getRepository(Link)
    const repositoryUser = getRepository(User)

    const currentUser: User = await repositoryUser.findOne({ where: { id: idUser } })

    if (!currentUser)
      throw new InvalidCredencial("User not found.")
    if (currentUser.links.find((link) => link.url === req.body.url))
      throw new ParamExists("new link has exist in your collection")

    const newLink = repositoryLink.save({
      type: req.body.type,
      url: req.body.url,
      owner: currentUser,
    })

    Sender.sucess(res, newLink)
  } catch (e) {
    Sender.error(res, e)
  }
}