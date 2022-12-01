import { QueryNodeRepo } from "@/Infra/Node/Repository/QueryNodeRepo"
import {GetVersion} from "@/Presentation/Controller/Infra/Node/GetVersion"
import { InfraError } from "@/Presentation/Error/InfraError"

const makeSut = (): GetVersion => {
    const sut = new GetVersion()
    return sut
}

describe('GetVersion', () => {
    it('should returns 200 and server node version', async () => {
        const sut = makeSut()
        const response = await sut.handle()
        expect(response.statusCode).toBe(200)
        expect(response.data).toBeDefined()
    })

    it('should returns 500 if infra failed', async () => {
        jest.spyOn(QueryNodeRepo.prototype, 'getNodeVersion').mockImplementationOnce(() => {
            throw new InfraError("Have error on node version command")
        })
        const sut = makeSut()
        const promise = sut.handle()
        await expect(promise).rejects.toEqual(new InfraError("Have error on node version command"))
    })
})