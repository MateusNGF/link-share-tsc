import { ErrorCustom } from "./ErrorCustom"

export class InvalidParam extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 400
    this.name = "InvalidParam"
  }
}