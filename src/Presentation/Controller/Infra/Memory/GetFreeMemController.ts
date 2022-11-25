import GetFreeMemoryInteractor from "@/Domain/Usecase/Memory/GetFreeMemoryInteractor";
import QueryFreeMem from "@/Infra/Memory/Repository/QueryFreeMemRepo";
import { Controller, Response } from "@/Presentation/Protocol/Controller";

export default class GetFreeMemoryController implements Controller {
    public async handle(): Promise<Response> {
        const queryMem = new QueryFreeMem()
        const freeMemInteractor = new GetFreeMemoryInteractor(queryMem)
        const result = await freeMemInteractor.perform()

        return {
            statusCode: 200,
            data: result
        }
    }
}