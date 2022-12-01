import { QueryPSDocker } from "@/Infra/Docker/Repository/QueryPSCommand"

export class DockerPSInteractor {
    constructor(private readonly queryDocker: QueryPSDocker) { }
    public async perform(all: boolean): Promise<any[]> {
        const result = await this.queryDocker.getContainers(all)
        return result
    }
}