import { Request, Response } from "express";
import { getRepository, Not } from "typeorm";
import { User } from "../../entity";
import { buildBody, NotFound, Sender } from "../../utils";

export const refresh = async (req: Request, res: Response) => {
  try {
    const idUser = req.header['user']['id']
    const currentUser: User = await getRepository(User).findOne({ id: idUser })
    if (!currentUser) throw new NotFound("User not found.")
    Sender.sucess(res, buildBody(currentUser))
  } catch (e) {
    Sender.error(res, e)
  }
}