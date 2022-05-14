import { Request, Response } from "express";
import { IController } from "../../controllers";


export type typeCustomRequest = { body?: any, params?: any, query?: any, header?: any, file ?: any, files ?: any }
export type typeCustomResponse = { statusCode: number, body: any }

export class ExpressAdapterRouter {
  static adapt(controller: IController): any {
    return async (req: Request, res: Response) => {
      const customRequest: typeCustomRequest = {
        body: req.body, params: req.params, query: req.query, header: req.header, file : req.file, files : req.files
      }
      const httpResponse: typeCustomResponse = await controller.exec(customRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}