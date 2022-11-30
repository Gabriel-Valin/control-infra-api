import { Router } from 'express'
import { adaptExpressRoute } from '@/Presentation/Adapter/ExpressRouterAdapter'
import {GetFreeMemoryController} from '@/Presentation/Controller/Infra/Memory/GetFreeMemController'

export const memoryRouter = Router()
const freeMemory = new GetFreeMemoryController()

memoryRouter.get('/infra/memory/free', adaptExpressRoute(freeMemory))