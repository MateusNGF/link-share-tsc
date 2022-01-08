import { typeCustomRequest, typeCustomResponse } from "../../utils/adapter";

export interface IController {
  exec(request: typeCustomRequest): Promise<typeCustomResponse>
}