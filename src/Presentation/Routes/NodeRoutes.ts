import { Router } from 'express'
import { adaptExpressRoute } from '@/Presentation/Adapter/ExpressRouterAdapter'
import GetVersion from '@/Presentation/Controller/Infra/Node/GetVersion'

export const nodeRouter = Router()
const getVersion = new GetVersion()

nodeRouter.get('/infra/node/version', adaptExpressRoute(getVersion))