import GetNodeVersionInteractor from '@/Domain/Usecase/GetNodeVersionInteractor'
import QueryNodeRepo from '@/Infra/Repository/Node/QueryNodeRepo'
import { Controller, Response } from '@/Presentation/Protocol/Controller'


export default class GetVersion implements Controller {
    public async handle(): Promise<Response> {
        const queryNodeRepo = new QueryNodeRepo()
        const nodeVersionInteractor = new GetNodeVersionInteractor(queryNodeRepo)
        const result = await nodeVersionInteractor.perform()
        return {
            statusCode: 200,
            data: result
        }
    }
}