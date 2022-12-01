import { Router } from "express"
import { GetContainer } from "@/Presentation/Controller/Infra/Docker/GetContainers"
import { adaptExpressRoute } from "@/Presentation/Adapter/ExpressRouterAdapter"

export const dockerRouter = Router()
const dockerContainers = new GetContainer()

dockerRouter.get('/infra/docker/container', adaptExpressRoute(dockerContainers))