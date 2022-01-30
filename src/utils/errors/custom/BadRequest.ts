import { ErrorCustom } from "./ErrorCustom"

export class BadRequest extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 400
    this.name = "Bad Request"
  }
}