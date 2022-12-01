import { DockerPSInteractor } from "@/Domain/Usecase/Docker/QueryPSContainers";
import { QueryPSCommand } from "@/Infra/Docker/Repository/QueryPSCommand";
import { Controller } from "@/Presentation/Protocol/Controller";

type IDockerPSRequest = {
    all: boolean
}

export class GetContainer implements Controller {
    public async handle(params?: IDockerPSRequest): Promise<{ statusCode: number; data?: any; }> {
        const repo = new QueryPSCommand()
        const dockerPSInteractor = new DockerPSInteractor(repo)
        const result = await dockerPSInteractor.perform(!!params?.all ? params?.all : false)
        return {
            statusCode: 200,
            data: result
        }
    }
}