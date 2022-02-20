import { NextFunction, Request, Response } from "express";
import { boolean } from "joi";
import jwt from "jsonwebtoken";
import { User } from "../entity";
import { MissingParameters } from "./errors";
import { Unauthorized } from "./errors/custom";

export const verify = (req: Request, res: Response, next: NextFunction): any => {
   try {
      let token = req.headers["x-access-token"];
      if (!token) throw new Unauthorized("Access Denied.");

      req.header["user"] = decoded(token.toString());
      next();
   } catch (error) {
      res.status(401).json({
         status: false,
         body: {
            message: error.message,
         },
      });
   }
};

export const decoded = (token: string): {} => {
   let decodedUser: any;
   jwt.verify(token, process.env.jwtPassword, (failed, decoded) => {
      if (failed) throw new Unauthorized("Access key invalid");
      decodedUser = decoded;
   });
   return decodedUser;
};

export const create = (
   params: {},
   time: string = process.env.jwtExpiredDefaultTime,
   secret: string = process.env.jwtPassword
) => {
   if (!params) throw new MissingParameters("Params for create JsonWebToken missings");
   return jwt.sign(params, secret, {
      expiresIn: time,
   });
};

export const buildBody = (user: User, requiredToken:boolean = true): any => {
   if (requiredToken) {
      user["token"] = create({ id: user.id });
   }

   delete user["password"];
   delete user["id"];
   return user;
};
