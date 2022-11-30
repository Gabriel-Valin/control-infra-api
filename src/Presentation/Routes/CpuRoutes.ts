import { Router } from 'express'
import { adaptExpressRoute } from '@/Presentation/Adapter/ExpressRouterAdapter'
import {CpuInfoController} from '@/Presentation/Controller/Infra/CPU/CpuInfoController'

export const cpuRouter = Router()
const cpuInfo = new CpuInfoController()

cpuRouter.get('/infra/cpu/info', adaptExpressRoute(cpuInfo))