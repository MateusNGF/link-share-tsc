import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

import { Unauthorized } from "./errors/custom";
import { Sender } from "./Sender";
import { MissingParameters } from "./errors";
import { User } from "../entity";

export const verify = (req: Request, res: Response, next: NextFunction): any => {
  try {
    let token = req.headers['x-access-token']
    if (!token) throw new Unauthorized("Access Denied.")

    req.header['user'] = decoded(token.toString())
    next()
  } catch (error) {
    Sender.error(res, error)
  }
}

export const decoded = (token: string): {} => {
  let decodedUser: any
  jwt.verify(token, process.env.jwtPassoword, (faild, decoded) => {
    if (faild) throw new Unauthorized("Access key invalid")
    decodedUser = decoded
  })
  return decodedUser
}

export const create = (
  params: {},
  time: string = process.env.jwtExpiredDefaultTime,
  secret: string = process.env.jwtPassoword
) => {
  if (!params) throw new MissingParameters("Params for create JsonWebToken missings")
  return jwt.sign(params, secret, {
    expiresIn: time
  })
}

export const buildBody = (user: User): any => {
  user['token'] = create({ id: user.id })

  delete user['password']
  delete user['id']
  return user
}