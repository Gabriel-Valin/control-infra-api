import {GetNodeVersionInteractor} from '@/Domain/Usecase/Node/GetNodeVersionInteractor'
import {QueryNodeRepo} from '@/Infra/Node/Repository/QueryNodeRepo'
import { Controller } from '@/Presentation/Protocol/Controller'
import { Example, Get, Response, Route, Tags } from 'tsoa'

@Route('infra/node/version')
@Tags("Node")
export class GetVersion implements Controller {
    /**
     * Get Host node version.
    */
    @Get()
    @Example({
        nodeVersion: 'v18.12.1'
    })
    public async handle(): Promise<{statusCode: number; data?: any}> {
        const queryNodeRepo = new QueryNodeRepo()
        const nodeVersionInteractor = new GetNodeVersionInteractor(queryNodeRepo)
        const result = await nodeVersionInteractor.perform()
        return {
            statusCode: 200,
            data: result
        }
    }
}