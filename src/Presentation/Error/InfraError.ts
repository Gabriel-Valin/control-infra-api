export class InfraError {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    this.message = message
    this.statusCode = statusCode
  }
}