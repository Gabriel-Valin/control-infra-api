import express from "express"
import cors from "cors"
import { internalServerMiddleware } from "@/Presentation/Middleware/ErrorHandling"
import { nodeRouter } from "@/Presentation/Routes/NodeRoutes"

export const app = express()

app.use(express.json())
app.use(cors())
app.use(nodeRouter)
app.use(internalServerMiddleware)