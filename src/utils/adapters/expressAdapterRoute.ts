import { Request, Response } from "express";
import { IController } from "../../controllers";


export type RequestCustom = {body?: any;params?: any;query?: any;header?: any;file?: any;files?: any;};
export type ResponseCustom<T=any> = { statusCode: number; body:T};

export const expressAdapterRouter = (controller: IController) => {
    return async (req: Request, res: Response) => {
      const customRequest: RequestCustom = req
      const httpResponse: ResponseCustom = await controller.exec(customRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
}
