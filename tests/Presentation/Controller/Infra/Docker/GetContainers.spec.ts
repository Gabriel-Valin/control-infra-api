import { QueryPSCommand } from "@/Infra/Docker/Repository/QueryPSCommand"
import { GetContainer } from "@/Presentation/Controller/Infra/Docker/GetContainers"
import { InfraError } from "@/Presentation/Error/InfraError"

const makeSut = (): GetContainer => {
    const sut = new GetContainer()
    return sut
}

describe('Version', () => {
    it('should returns 200 if parameter is provided', async () => {
        const sut = makeSut()
        const response = await sut.handle({ all: true })
        expect(response.statusCode).toBe(200)
        expect(response.data.length).toBeGreaterThanOrEqual(0)
    })

    it('should returns 200 and server node version', async () => {
        const sut = makeSut()
        const response = await sut.handle()
        expect(response.statusCode).toBe(200)
        expect(response.data.length).toBeGreaterThanOrEqual(0)
    })

    it('should returns 500 if infra failed', async () => {
        jest.spyOn(QueryPSCommand.prototype, 'getContainers').mockImplementationOnce(() => {
            throw new InfraError("Have error on node version command")
        })
        const sut = makeSut()
        const promise = sut.handle()
        await expect(promise).rejects.toEqual(new InfraError("Have error on node version command"))
    })
})