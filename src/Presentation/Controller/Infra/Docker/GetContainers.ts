import { DockerPSInteractor } from "@/Domain/Usecase/Docker/QueryPSContainers";
import { QueryPSCommand } from "@/Infra/Docker/Repository/QueryPSCommand";
import { Controller } from "@/Presentation/Protocol/Controller";
import { Example, Get, Hidden, Query, Response, Route, SuccessResponse, Tags } from "tsoa";

@Route('infra/docker/container')
@Tags("Docker")
export class GetContainer implements Controller {
    @Get()
    @Example({
        statusCode: 200,
        data: [
            {
                "id": "container_id",
                "network": "network-node_default",
                "runningFor": "10 hours ago",
                "state": "exited",
                "name": "container-name",
                "status": "Exited (1) 10 hours ago"
            }
        ]
    })
    public async handle(
        @Query() @Hidden() request?: any,
        @Query() all?: string,
    ): Promise<{ statusCode: number; data?: any; }> {
        const flag = request.all === undefined ? false : true
        const repo = new QueryPSCommand()
        const dockerPSInteractor = new DockerPSInteractor(repo)
        const result = await dockerPSInteractor.perform(flag)
        return {
            statusCode: 200,
            data: result
        }
    }
}