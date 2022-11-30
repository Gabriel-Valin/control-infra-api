import {CpuInfoInteractor} from "@/Domain/Usecase/CPU/CpuInfoInteractor";
import {QueryCpuInfo} from "@/Infra/CPU/Repository/QueryCpuInfoRepo";
import { Controller, Response } from "@/Presentation/Protocol/Controller";
import { Get, Example, Route, Tags } from "tsoa";

@Route('infra/cpu/info')
@Tags("CPU")
export class CpuInfoController implements Controller {
    /**
     * Get Informations about CPU's from Host
    */
    @Get()
    @Example({
        cpuInfos: '1.2 GB'
    })
    public async handle(): Promise<{statusCode: number; data?: any}> {
        const queryCPU = new QueryCpuInfo()
        const cpuInteractor = new CpuInfoInteractor(queryCPU)
        const result = await cpuInteractor.perform()
        return {
            statusCode: 200,
            data: result
        }
    }
}