import { Response } from "express";

export class Sender {

  static sucess(res: Response, body: {}): void {
    res.status(200).json({
      status: true, body
    })
  }

  static error(res: Response, error: any): void {
    if (!error.status) {
      res.status(500).json({
        status: false,
        message: "Internal Error. Try later... :("
      })
      const date = new Date()
      const LogDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} as ${date.getHours()}:${date.getMinutes()}`
      console.log(LogDate, `===> ${error.name} : ${error.message}`)
    } else {
      res.status(error.status).json({
        status: false,
        message: error.message
      })
    }
  }
}