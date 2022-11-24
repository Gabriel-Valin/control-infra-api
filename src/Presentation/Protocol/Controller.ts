type ResponseJson<T = any> = { statusCode: number; data?: T }

export type Response = ResponseJson

export interface Controller<T = any> {
  handle(request: T): Promise<Response>
}