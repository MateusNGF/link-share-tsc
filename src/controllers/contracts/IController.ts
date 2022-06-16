import { RequestCustom, ResponseCustom } from "../../utils/adapters";

export interface IController {
  exec(request: RequestCustom): Promise<ResponseCustom>
}