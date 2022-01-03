import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from "../../entity"
import { InvalidCredencial, Unauthorized } from "../../utils/errors/custom"
import { buildBody } from "../../utils/JsonWebToken"
import { Sender } from "../../utils/Sender"

export const access = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(User)
    const returnCurrentUser: User = await repo.findOne({ where: { email: req.body.email } })

    if (!returnCurrentUser)
      throw new InvalidCredencial("Email not registred.")
    if (returnCurrentUser.password !== req.body.password)
      throw new Unauthorized("Password invalid.")

    Sender.sucess(res, buildBody(returnCurrentUser))
  } catch (e) {
    Sender.error(res, e)
  }
}












