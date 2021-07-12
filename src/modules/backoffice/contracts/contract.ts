export interface IContract {
  errors: any[]
  validate(model: any): boolean
}
