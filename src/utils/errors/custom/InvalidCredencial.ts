import { ErrorCustom } from "./ErrorCustom"

export class InvalidCredencial extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 406
    this.name = "InvalidCredencial"
  }
}