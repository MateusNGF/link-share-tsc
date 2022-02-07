import { InvalidParam } from ".";
import { typeCustomResponse } from "./adapter";

export class Messenger {
  static success(body: object): typeCustomResponse {
    return { statusCode: 200, body: { status: true, body } }
  }

  static error(error: any): typeCustomResponse {
    if (error.name === "ValidationError") error = new InvalidParam(error.message)
    if (!error.custom) { this.sendInConsole(error); return { statusCode: 500, body: { status: false, message: "Internal Error. Try later... :(" } } }
    return { statusCode: error.status, body: { status: false, message: error.message } }
  }

  static sendInConsole(error): void {
    const date = new Date(); console.log(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} as ${date.getHours()}:${date.getMinutes()}`, `===> ${error.name} : ${error.message}`)
  }
}