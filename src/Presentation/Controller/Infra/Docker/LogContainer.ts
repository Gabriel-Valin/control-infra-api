import { QueryLOGContainerInteractor } from "@/Domain/Usecase/Docker/QueryLOGContainer";
import { QueryLOGCommand } from "@/Infra/Docker/Repository/QueryLOGCommand";
import { Controller } from "@/Presentation/Protocol/Controller";
import { Hidden, Path, Query, Route, Get, Tags, Example } from "tsoa";

@Route('infra/docker/log/:identifier')
@Tags('Docker')
export class LogContainer implements Controller {
    @Get()
    @Example({
        statusCode: 200,
        data: [
            '2022-12-01T17:14:37.502209838Z > application@1.0.0 start',
            '2022-12-01T17:14:37.502218428Z > node dist/start.js',
            '2022-12-01T17:14:37.502225692Z ',
            '2022-12-01T17:14:38.302485153Z Application is up!',
            '2022-12-05T13:20:44.270322713Z ',
            ''
        ]
    })
    public async handle(
        @Query() @Hidden() request?: any,
        @Path() identifier?: string
    ): Promise<{ statusCode: number; data?: any; }> {
        const repo = new QueryLOGCommand()
        const interactor = new QueryLOGContainerInteractor(repo)
        const result = await interactor.perform(request.identifier)
        return {
            statusCode: 200,
            data: result
        }
    }
}