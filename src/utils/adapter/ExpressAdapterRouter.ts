import { Request, Response } from "express";
import { IController } from "../../controllers";


export type RequestCustom = {body?: any;params?: any;query?: any;header?: any;file?: any;files?: any;};
export type ResponseCustom<T=any> = { statusCode: number; body:T};

export class ExpressAdapterRouter {
  static adapt(controller: IController): any {
    return async (req: Request, res: Response) => {
      const customRequest: RequestCustom =  {
        body: req.body,
        params: req.params,
        query: req.query,
        header: req.header,
        file: req.file,
        files: req.files,
      };
      const httpResponse: ResponseCustom = await controller.exec(
        customRequest
      );
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
