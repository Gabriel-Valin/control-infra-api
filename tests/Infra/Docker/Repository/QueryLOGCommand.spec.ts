import { InfraError } from "@/Presentation/Error/InfraError"
import { ChildProcess } from "child_process"
import { QueryLOGCommand } from "@/Infra/Docker/Repository/QueryLOGCommand"

type ContainerIdentifier = {
    id?: string
    partialID?: string
    containerName?: string
}



const makeSut = (): QueryLOGCommand => {
    const sut = new QueryLOGCommand()
    return sut
}

describe('QueryPSCommand', () => {
    it('should returns the list of containers if flag NOT is provided', async () => {
        const sut = makeSut()
        const result = await sut.getLog('control-infra-api')
        expect(result.length).toBeGreaterThanOrEqual(1)
    })

    it('should returns empty array if not found container', async () => {
        const sut = makeSut()
        const result = await sut.getLog('any-container')
        expect(result[0]).toBe('')
    })

    it('should returns infra error', async () => {
        jest.spyOn(ChildProcess.prototype, 'once').mockImplementationOnce(() => {
            throw new InfraError("Have error on node version command")
        })
        const sut = makeSut()
        const promise = sut.getLog('control-infra-api')
        await expect(promise).rejects.toEqual(new InfraError("Have error on node version command"))
    })
})