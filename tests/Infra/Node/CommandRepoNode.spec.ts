import CommandRepoNode from "@/Infra/Node/Repository/CommandRepoNode"
import { InfraError } from "@/Presentation/Error/InfraError"
import { ChildProcess } from 'child_process'

const makeSut = (): CommandRepoNode => {
    const sut = new CommandRepoNode()
    return sut
}

describe('CommandRepoNode', () => {
    it('should returns node error message if invalid version is provided', async () => {
        const sut = makeSut()
        const nodeVersion = await sut.updateNodeVersion(101010)
        expect(nodeVersion).toBe('Invalid Node Version, please install first or typing correctly version.')
    })

    it('should returns new default shell node version', async () => {
        const sut = makeSut()
        const nodeVersion = await sut.updateNodeVersion(18)
        expect(nodeVersion).toBeTruthy()
    })

    it('should returns infra error', async () => {
        jest.spyOn(ChildProcess.prototype, 'once').mockImplementationOnce(() => {
            throw new InfraError("Have error on node version command")
        })
        const sut = makeSut()
        const promise = sut.updateNodeVersion(0)
        await expect(promise).rejects.toEqual(new InfraError("Have error on node version command"))
    })
})