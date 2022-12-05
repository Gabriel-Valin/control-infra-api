import { spawn } from "child_process"
import { once } from "events"

export interface QueryLOGContainer {
    getLog(identifier: string): Promise<any>
}

export class QueryLOGCommand implements QueryLOGContainer {
    public async getLog(identifier: string): Promise<any> {
        let output = ''
        const logsFromContainer = spawn('docker logs', [identifier, '--timestamps'], {
            shell: true
        })

        logsFromContainer.stdout.setEncoding('utf-8')

        logsFromContainer.stdout.on('data', data => {
            output += data.toString()
        })

        await once(logsFromContainer, 'close')
        const splitBrokenLines = output.split('\n')
        return splitBrokenLines
    }
}