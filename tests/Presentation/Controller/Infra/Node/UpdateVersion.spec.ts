import { CommandRepoNode } from "@/Infra/Node/Repository/CommandRepoNode"
import { UpdateVersion } from "@/Presentation/Controller/Infra/Node/UpdateVersion"
import { InfraError } from "@/Presentation/Error/InfraError"

const makeSut = (): UpdateVersion => {
    const sut = new UpdateVersion()
    return sut
}

describe('UpdateVersion', () => {
    it('should returns 200 and server node version', async () => {
        const sut = makeSut()
        const response = await sut.handle({ nodeVersion: 18 })
        expect(response.statusCode).toBe(200)
        expect(response.data).toBeDefined()
    })

    it('should returns 500 if infra failed', async () => {
        jest.spyOn(CommandRepoNode.prototype, 'updateNodeVersion').mockImplementationOnce(() => {
            throw new InfraError("Have error on node version command")
        })
        const sut = makeSut()
        const promise = sut.handle({ nodeVersion: 16 })
        await expect(promise).rejects.toEqual(new InfraError("Have error on node version command"))
    })
})