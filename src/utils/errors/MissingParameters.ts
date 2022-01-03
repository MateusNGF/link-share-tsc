
export class MissingParameters extends Error {
  name: string = "MissingParameters"
  constructor(msg: string) {
    super(msg)
  }
}
