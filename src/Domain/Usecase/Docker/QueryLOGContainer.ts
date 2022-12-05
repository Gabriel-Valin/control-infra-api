import { QueryLOGContainer } from "@/Infra/Docker/Repository/QueryLOGCommand";

export class QueryLOGContainerInteractor {
    constructor(private readonly queryDocker: QueryLOGContainer) { }
    public async perform(identifer: string) {
        const result = await this.queryDocker.getLog(identifer)
        return result
    }
}