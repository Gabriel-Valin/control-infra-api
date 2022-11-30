import express from "express"
import cors from "cors"
import { internalServerMiddleware } from "@/Presentation/Middleware/ErrorHandling"
import { nodeRouter } from "@/Presentation/Routes/NodeRoutes"
import { cpuRouter } from "@/Presentation/Routes/CpuRoutes"
import { memoryRouter } from "@/Presentation/Routes/MemoryRoutes"
import { RegisterRoutes } from "@/OpenApi/routes"
import swaggerUi from 'swagger-ui-express'
import * as swaggerjson from '@/OpenApi/swagger.json'

export const app = express()

app.use(express.json())
app.use(cors())
app.use(nodeRouter)
app.use(cpuRouter)
app.use(memoryRouter)
app.use(internalServerMiddleware)
RegisterRoutes(app)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerjson))