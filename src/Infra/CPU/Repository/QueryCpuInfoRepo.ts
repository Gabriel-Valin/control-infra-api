import { cpus } from "os"

export interface QueryCpu {
    getCpuInfo(): Promise<any[]>
}

export class QueryCpuInfo implements QueryCpu {
    public async getCpuInfo(): Promise<any[]> {
        const cpuInfos = cpus()
        return cpuInfos
    }
}
