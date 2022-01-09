import { ErrorCustom } from "./ErrorCustom"

export class DataNotFound extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 400
    this.name = "DataNotFound"
  }
}