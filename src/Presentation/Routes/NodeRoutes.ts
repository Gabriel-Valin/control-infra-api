import { Router } from 'express'
import { adaptExpressRoute } from '@/Presentation/Adapter/ExpressRouterAdapter'
import {GetVersion} from '@/Presentation/Controller/Infra/Node/GetVersion'
import {UpdateVersion} from '@/Presentation//Controller/Infra/Node/UpdateVersion'

export const nodeRouter = Router()
const getVersion = new GetVersion()
const updateVersion = new UpdateVersion()

nodeRouter.get('/infra/node/version', adaptExpressRoute(getVersion))
nodeRouter.put('/infra/node/update/version', adaptExpressRoute(updateVersion))