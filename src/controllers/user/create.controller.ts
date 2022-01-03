import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Link, User } from "../../entity";
import { buildBody } from "../../utils/JsonWebToken";
import { ParamExists } from "../../utils/errors/custom";
import { Sender } from "../../utils/Sender";


export const create = async (req: Request, res: Response) => {
  try {
    const repository = getRepository(User)

    const userCurrent = new User()

    if (await repository.findOne({ where: { email: req.body.email } }))
      throw new ParamExists(`email ${req.body.email} has exist, try to swap.`)
    if (await repository.findOne({ where: { nickname: req.body.nickname } }))
      throw new ParamExists(`nickname ${req.body.nickname} has exist, try to swap.`)


    userCurrent.name = req.body.name
    userCurrent.email = req.body.email
    userCurrent.nickname = req.body.nickname
    userCurrent.password = req.body.password


    if (req.body.links && req.body.links.length > 0) {
      userCurrent.links = []
      req.body.links.forEach((link: Link) => {
        const linkCurrent = new Link()

        linkCurrent.type = link.type
        linkCurrent.url = link.url

        userCurrent.links.push(linkCurrent)
      })
    }
    const resultCreateUser = await repository.save(userCurrent)

    Sender.sucess(res, buildBody(resultCreateUser))
  } catch (e) {
    Sender.error(res, e)
  }
}