import { IErrorCustom } from ".."

export abstract class ErrorCustom extends Error implements IErrorCustom {
  constructor(message : string, params ?: any){
    super(message)
    this.params = params || {}
  }

  public custom: boolean = true
  public status: number
  public params?: any
}