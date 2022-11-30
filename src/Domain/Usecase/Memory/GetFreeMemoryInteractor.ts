import { FreeMem } from "@/Infra/Memory/Repository/QueryFreeMemRepo";

export class GetFreeMemoryInteractor {
    constructor(private readonly queryMem: FreeMem) {}
    public async perform(): Promise<{ freeMem: string }> {
        const result = await this.queryMem.getFreeMem()
        return result
    }
}