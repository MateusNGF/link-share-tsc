export interface IController<T = any> {
  handler(): Promise<T>
}