import { QueryCpu } from "@/Infra/CPU/Repository/QueryCpuInfoRepo"

export default class CpuInfoInteractor {
    constructor(private readonly queryCPU: QueryCpu) { }
    public async perform(): Promise<any[]> {
        const result = await this.queryCPU.getCpuInfo()
        return result
    }
}