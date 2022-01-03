import { ErrorCustom } from "./ErrorCustom"

export class ParamExists extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 400
    this.name = "ParamExists"
  }
}