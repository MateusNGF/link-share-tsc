import { RequestCustom, ResponseCustom } from "../../utils/adapter";

export interface IController {
  exec(request: RequestCustom): Promise<ResponseCustom>
}