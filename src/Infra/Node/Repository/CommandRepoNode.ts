import { InfraError } from "@/Presentation/Error/InfraError"
import { spawn } from 'child_process'
import { once } from "events"
import { cwd } from "process"

export interface CommandRepo {
    updateNodeVersion(version: number): Promise<{ newNodeVersion: string } | string>
}

export default class CommandRepoNode implements CommandRepo {
    public async updateNodeVersion(version: number): Promise<{ newNodeVersion: string } | string> {
        try {
            let output = ''
            
            const updateNodeVersionByNVM = spawn(`./UpdateNodeVersion.sh ${version.toString()}`, {
                cwd: `${cwd()}/shs/NODE`,
                shell: '/bin/sh'
            })

            updateNodeVersionByNVM.stdout.setEncoding('utf-8')

            updateNodeVersionByNVM.stdout.on('data', data => {
                output += data.toString()
            })

            updateNodeVersionByNVM.stderr.on('data', data => {
                output += data.toString()
            })

            await once(updateNodeVersionByNVM, 'close')

            const regexInvalidVersion = new RegExp('N\/A')
            const matchValue = regexInvalidVersion.test(output)
           
            if (matchValue) {
                return 'Invalid Node Version, please install first or typing correctly version.'
            }
            return {
                newNodeVersion: output.substring(69, 78).slice(0,8)
            }
        } catch (error) {
            throw new InfraError("Have error on node version command")
        }
    }
}