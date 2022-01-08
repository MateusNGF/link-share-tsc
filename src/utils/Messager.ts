import { typeCustomResponse } from "./adapter";

export class Messager {
  static sucess(body: object): typeCustomResponse {
    return {
      statusCode: 200,
      body: { status: true, body }
    }
  }

  static error(error: any): typeCustomResponse {
    if (!error.custom) {
      // send error in consolg
      const date = new Date(); console.log(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} as ${date.getHours()}:${date.getMinutes()}`, `===> ${error.name} : ${error.message}`)
      return {
        statusCode: 500,
        body: {
          status: false,
          message: "Internal Error. Try later... :("
        }
      }
    }

    return {
      statusCode: error.status,
      body: { status: false, message: error.message }
    }
  }
}