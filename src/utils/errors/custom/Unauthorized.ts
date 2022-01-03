import { ErrorCustom } from "./ErrorCustom"

export class Unauthorized extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 401
    this.name = "Unauthorized"
  }
}