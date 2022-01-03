import { ErrorCustom } from "./ErrorCustom"

export class InternalError extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 500
    this.name = "InternalError"
  }
}