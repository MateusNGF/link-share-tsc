import { ErrorCustom } from "./ErrorCustom";


export class FileError extends ErrorCustom {
  constructor(msg: string) {
    super(msg)

    this.status = 418
    this.name = "FileError"
  }
}