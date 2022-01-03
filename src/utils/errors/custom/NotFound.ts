import { ErrorCustom } from "./ErrorCustom"

export class NotFound extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 400
    this.name = "NotFound"
  }
}