import { IErrorCustom } from ".."

export class ErrorCustom extends Error implements IErrorCustom {
  public custom: boolean = true
  public status: number
}