import { Router } from "express"
import { GetContainer } from "@/Presentation/Controller/Infra/Docker/GetContainers"
import { adaptExpressRoute } from "@/Presentation/Adapter/ExpressRouterAdapter"
import { LogContainer } from "@/Presentation/Controller/Infra/Docker/LogContainer"

export const dockerRouter = Router()
const dockerContainers = new GetContainer()
const logContainer = new LogContainer()

dockerRouter.get('/infra/docker/container', adaptExpressRoute(dockerContainers))
dockerRouter.get('/infra/docker/log/:identifier', adaptExpressRoute(logContainer))