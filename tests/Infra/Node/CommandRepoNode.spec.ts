import { NodeVersion } from "@/Domain/ValueObject/NodeVersion"
import {CommandRepoNode} from "@/Infra/Node/Repository/CommandRepoNode"
import { InfraError } from "@/Presentation/Error/InfraError"
import { ChildProcess } from 'child_process'

const makeSut = (): CommandRepoNode => {
    const sut = new CommandRepoNode()
    return sut
}

describe('CommandRepoNode', () => {
    it('should returns new default shell node version', async () => {
        const sut = makeSut()
        const nodeVersion = await sut.updateNodeVersion(new NodeVersion('18'))
        expect(nodeVersion).toBeTruthy()
    })

    it('should returns infra error', async () => {
        jest.spyOn(ChildProcess.prototype, 'once').mockImplementationOnce(() => {
            throw new InfraError("Have error on node version command")
        })
        const sut = makeSut()
        const promise = sut.updateNodeVersion(new NodeVersion('16'))
        await expect(promise).rejects.toEqual(new InfraError("Have error on node version command"))
    })
})