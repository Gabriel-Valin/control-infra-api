import UpdateNodeVersionInteractor from "@/Domain/Usecase/Node/UpdateNodeVersionInteractor";
import CommandRepoNode from "@/Infra/Node/Repository/CommandRepoNode";
import { Controller, Response } from "@/Presentation/Protocol/Controller";

type INodeRequest = {
    nodeVersion: number
}

export default class UpdateVersion implements Controller {
    public async handle({ nodeVersion }: INodeRequest): Promise<Response> {
        const commandRepo = new CommandRepoNode()
        const updateNodeVersionInteractor = new UpdateNodeVersionInteractor(commandRepo)
        const result = await updateNodeVersionInteractor.perform(nodeVersion)
        return {
            statusCode: 200,
            data: result
        }
    }
}