import CpuInfoInteractor from "@/Domain/Usecase/CPU/CpuInfoInteractor";
import QueryCpuInfo from "@/Infra/CPU/Repository/QueryCpuInfo";
import { Controller, Response } from "@/Presentation/Protocol/Controller";

export default class CpuInfoController implements Controller {
    public async handle(): Promise<Response> {
        const queryCPU = new QueryCpuInfo()
        const cpuInteractor = new CpuInfoInteractor(queryCPU)
        const result = await cpuInteractor.perform()
        return {
            statusCode: 200,
            data: result
        }
    }
}