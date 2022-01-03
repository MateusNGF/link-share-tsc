import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Link, User } from "../../entity"
import { NotFound, Sender, Unauthorized } from "../../utils"

export const deletar = async (req: Request, res: Response) => {
  try {
    const idUser = req.header['user']['id']
    const idLink = req.params['idLink']

    const repositoryUser = getRepository(User)

    const currentUser: User = await repositoryUser.findOne({ where: { id: idUser } })

    if (!currentUser)
      throw new NotFound("Error in search account.")

    if (!currentUser.links.find((link: Link) => (link.id_link == idLink)))
      throw new Unauthorized("Action Denied.")

    const deleteCurrentLink = getRepository(Link).delete({ id_link: idLink })
    Sender.sucess(res, deleteCurrentLink)
  } catch (error) {
    Sender.error(res, error)
  }
}