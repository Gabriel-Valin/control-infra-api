import {UpdateNodeVersionInteractor} from "@/Domain/Usecase/Node/UpdateNodeVersionInteractor";
import {CommandRepoNode} from "@/Infra/Node/Repository/CommandRepoNode";
import { Controller } from "@/Presentation/Protocol/Controller";
import { Body, Tags, Example, Post, Put, Response, Route, SuccessResponse } from "tsoa";

type INodeRequest = {
    nodeVersion: number
}

@Route('infra/node/update/version')
@Tags("Node")
export class UpdateVersion implements Controller {
    /**
     * Update Host node version.
     * @example _nodeVersion "v18.12.1"
    */
    @Put()
    @Example({
        newNodeVersion: 'v18.16.1'
    })
    @Response<{ message: string }>('422', 'Unprocessable Entity', {
        message: 'InvalidNodeVersion|DeprecatedNodeVersion'
    })
    @Response<{ message: string }>('400', 'Bad Parameters', {
        message: 'VersionIsNotANumber'
    })
    public async handle(@Body() params: INodeRequest): Promise<{statusCode: number; data?: any}> {
        const commandRepo = new CommandRepoNode()
        const updateNodeVersionInteractor = new UpdateNodeVersionInteractor(commandRepo)
        const result = await updateNodeVersionInteractor.perform(params.nodeVersion)
        return {
            statusCode: 200,
            data: result
        }
    }
}