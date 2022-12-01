import { NodeVersion } from "@/Domain/ValueObject/NodeVersion"
import { InfraError } from "@/Presentation/Error/InfraError"
import { spawn } from 'child_process'
import { once } from "events"
import { cwd } from "process"

export interface CommandRepo {
    updateNodeVersion(version: NodeVersion): Promise<{ newNodeVersion: string } | string>
}

export class CommandRepoNode implements CommandRepo {
    public async updateNodeVersion(version: NodeVersion): Promise<{ newNodeVersion: string } | string> {
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
           
            return {
                newNodeVersion: output.substring(69, 78).slice(0,8)
            }
        } catch (error) {
            throw new InfraError("Have error on node version command")
        }
    }
}