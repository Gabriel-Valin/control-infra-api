import { QueryNode } from "@/Domain/Usecase/GetNodeVersionInteractor";
import { InfraError } from "@/Presentation/Error/InfraError";
import { spawn } from 'child_process'
import { once } from 'events'

export default class QueryNodeRepo implements QueryNode {
    public async getNodeVersion(): Promise<{nodeVersion: string}> {
        try {
            const nodeVersion = spawn('node', ['--version'])
            let output = ''

            nodeVersion.stdout.setEncoding('utf-8')

            nodeVersion.stdout.on('data', data => {
                output += data.toString()
            })

            await once(nodeVersion, 'close')
            return {
                nodeVersion: output.replace(/[\r\n]/g, '')
            }
        } catch (error) {
            throw new InfraError("Have error on node version command")
        }
        
    }
}