import {QueryNodeRepo} from '@/Infra/Node/Repository/QueryNodeRepo'
import { InfraError } from '@/Presentation/Error/InfraError'
import { ChildProcess } from 'child_process'

const makeSut = (): QueryNodeRepo => {
    const sut = new QueryNodeRepo()
    return sut
}

describe('QueryNodeRepo', () => {
    it('should return InfraError if repository failed', async () => {
        jest.spyOn(ChildProcess.prototype, 'once').mockImplementationOnce(() => {
            throw new InfraError("Have error on node version command")
        })

        const sut = makeSut()
        const promise = sut.getNodeVersion()
        await expect(promise).rejects.toEqual(new InfraError("Have error on node version command"))
        
    })

    it('should returns node version', async () => {
        const sut = makeSut()
        const nodeVersion = await sut.getNodeVersion()
        expect(nodeVersion).toBeDefined()
    })
})