import { InfraError } from '@/Presentation/Error/InfraError'
import { spawn, exec, execSync } from 'child_process'
import { once } from 'events'
import { cwd } from 'process'

export interface CommandRepo {
    updateNodeVersion(version: number): Promise<{ newNodeVersion: string } | string>
}

export default class CommandRepoNode implements CommandRepo {
    public async updateNodeVersion(version: number): Promise<{ newNodeVersion: string } | string> {
        try {
            let output = ''
            
            const nvmListVersions = spawn(`./UpdateNodeVersion.sh ${version.toString()}`, {
                cwd: `${cwd()}/shs/NODE`,
                shell: '/bin/sh'
            })

            nvmListVersions.stdout.setEncoding('utf-8')

            nvmListVersions.stdout.on('data', data => {
                output += data.toString()
            })

            nvmListVersions.stderr.on('data', data => {
                output += data.toString()
            })

            await once(nvmListVersions, 'close')

            const regexInvalidVersion = new RegExp('N\/A')
            const matchValue = regexInvalidVersion.test(output)
           
            if (matchValue) {
                return 'Invalid Node Version, please install first or typing correctly version.'
            }
            return {
                newNodeVersion: output.substring(69, 78)
            }
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
    it('should returns node error message if invalid version is provided', async () => {
        const sut = makeSut()
        const nodeVersion = await sut.updateNodeVersion(101010)
        expect(nodeVersion).toBe('Invalid Node Version, please install first or typing correctly version.')
    })

    it('should returns new default shell node version', async () => {
        const sut = makeSut()
        const nodeVersion = await sut.updateNodeVersion(18)
        expect(nodeVersion).toHaveProperty('newNodeVersion')
    })
})