import { Request, Response } from "express";
import { IController } from "../../controllers";


export type typeCustomRequest = { body: {}, params: {}, query: {} }
export type typeCustomResponse = { statusCode: number, body: {} }

export class ExpressAdapterRouter {
  static adapt(controller: IController): any {
    return async (req: Request, res: Response) => {
      const customRequest: typeCustomRequest = {
        body: req.body, params: req.params, query: req.query
      }
      const httpResponse: typeCustomResponse = await controller.exec(customRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}