import { InfraError } from '@/Presentation/Error/InfraError'
import { spawn, exec } from 'child_process'
import { once } from 'events'
import { cwd } from 'process'

export interface CommandRepo {
    updateNodeVersion(version: number): Promise<void>
}

export default class CommandRepoNode implements CommandRepo {
    public async updateNodeVersion(version: number): Promise<void> {
        try {
            let output = ''
            const nvmListVersions = spawn(`./UpdateNodeVersion.sh ${version.toString()}`, {
                shell: true
            })       

            nvmListVersions.stdout.on('data', data => {
                output += data.toString()
            })

            nvmListVersions.stderr.on('data', data => {
                output += data.toString()
            })


            await once(nvmListVersions, 'close')
            
            console.log(output)
        } catch (error) {
            throw new InfraError("Have error on node version command")
        }
    }
}

const makeSut = (): CommandRepoNode => {
    const sut = new CommandRepoNode()
    return sut
}

describe('CommandRepoNode', () => {
    it('should returns node version', async () => {
        const sut = makeSut()
        const nodeVersion = await sut.updateNodeVersion(18)
        expect(nodeVersion).toReturn()
    })
})