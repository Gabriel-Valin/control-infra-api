import { QueryLOGCommand } from "@/Infra/Docker/Repository/QueryLOGCommand"
import { InfraError } from "@/Presentation/Error/InfraError"
import { LogContainer } from "@/Presentation/Controller/Infra/Docker/LogContainer"

const makeSut = (): LogContainer => {
    const sut = new LogContainer()
    return sut
}

describe('Version', () => {
    it('should returns 200 if parameter is provided', async () => {
        const sut = makeSut()
        const response = await sut.handle({ identifier: 'control-infra-api' })
        expect(response.statusCode).toBe(200)
        expect(response.data.length).toBeGreaterThanOrEqual(1)
    })

    it('should returns 200 if parameter is NOT provided', async () => {
        const sut = makeSut()
        const response = await sut.handle({ identifier: 'no-valid-identifier' })
        expect(response.statusCode).toBe(200)
        expect(response.data[0]).toBe('')
    })

    it('should returns 500 if infra failed', async () => {
        jest.spyOn(QueryLOGCommand.prototype, 'getLog').mockImplementationOnce(() => {
            throw new InfraError("Have error on node version command")
        })
        const sut = makeSut()
        const promise = sut.handle({ identifier: 'control-infra-api' })
        await expect(promise).rejects.toEqual(new InfraError("Have error on node version command"))
    })
})