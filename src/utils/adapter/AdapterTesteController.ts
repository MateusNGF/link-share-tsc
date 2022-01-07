import { typeCustomResponse } from "./ExpressAdapterRouter";
import { IController } from "../../controllers/protocols";
import { typeCustomRequest } from ".";
import { Unauthorized } from "..";


export class AdapterTester implements IController {

  exec(request: typeCustomRequest): typeCustomResponse {
    try {
      const key = true
      if (key) throw new Unauthorized("Acesso negado.")
      return Messager.sucess({ message: "Sucesso" })
    } catch (e) {
      return Messager.error(e)
    }
  }
}
class Messager {
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