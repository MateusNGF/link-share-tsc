import { ErrorCustom } from "./ErrorCustom"

export class BadRequest extends ErrorCustom {
  constructor(message: string, params ?: any) {
    super(message, params)

    this.status = 400
    this.name = "Bad Request"
  }
}