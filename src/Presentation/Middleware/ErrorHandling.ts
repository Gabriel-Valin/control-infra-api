import { Request, Response, NextFunction } from "express"
import { InfraError } from "@/Presentation/Error/InfraError"
import { DomainError } from "@/Presentation/Error/DomainError"

export const internalServerMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof InfraError || err instanceof DomainError) {
    return response.status(err.statusCode).json({ message: err.message })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - Try Again Soon`
  })
}