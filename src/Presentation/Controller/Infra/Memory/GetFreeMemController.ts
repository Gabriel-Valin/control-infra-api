import {GetFreeMemoryInteractor} from "@/Domain/Usecase/Memory/GetFreeMemoryInteractor";
import {QueryFreeMem} from "@/Infra/Memory/Repository/QueryFreeMemRepo";
import { Controller, Response } from "@/Presentation/Protocol/Controller";
import { Example, Get, Route, Tags } from "tsoa";

@Route('infra/memory/free')
@Tags("Memory")
export class GetFreeMemoryController implements Controller {
    /**
     * Get Host Memory Free.
    */
    @Get()
    @Example({
        freeMem: '1.2 GB'
    })
    public async handle(): Promise<{statusCode: number; data?: any}> {
        const queryMem = new QueryFreeMem()
        const freeMemInteractor = new GetFreeMemoryInteractor(queryMem)
        const result = await freeMemInteractor.perform()

        return {
            statusCode: 200,
            data: result
        }
    }
}