import { ErrorCustom } from "./ErrorCustom"

export class InvalidFormat extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 400
    this.name = "InvalidFormat"
  }
}