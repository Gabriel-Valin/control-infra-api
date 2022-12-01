import { QueryPSCommand } from "@/Infra/Docker/Repository/QueryPSCommand"
import { InfraError } from "@/Presentation/Error/InfraError"
import { ChildProcess } from "child_process"

const makeSut = (): QueryPSCommand => {
    const sut = new QueryPSCommand()
    return sut
}

describe('QueryPSCommand', () => {
    it('should returns the list of containers if flag NOT is provided', async () => {
        const sut = makeSut()
        const result = await sut.getContainers()
        expect(result.length).toBeGreaterThanOrEqual(0)
    })

    it('should returns the list of containers if flag is provided', async () => {
        const sut = makeSut()
        const result = await sut.getContainers(true)
        expect(result.length).toBeGreaterThanOrEqual(0)
    })

    it('should returns infra error', async () => {
        jest.spyOn(ChildProcess.prototype, 'once').mockImplementationOnce(() => {
            throw new InfraError("Have error on node version command")
        })
        const sut = makeSut()
        const promise = sut.getContainers()
        await expect(promise).rejects.toEqual(new InfraError("Have error on node version command"))
    })
})