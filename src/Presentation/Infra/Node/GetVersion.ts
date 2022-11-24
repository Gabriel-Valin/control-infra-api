import { Controller, Response } from '@/Presentation/Protocol/Controller'
import { spawn } from 'child_process'
import { once } from 'events'

export default class GetVersion implements Controller {
    public async handle(): Promise<Response> {
        const nodeVersion = spawn('node', ['--version'])
        let output = ''

        nodeVersion.stdout.setEncoding('utf-8')

        nodeVersion.stdout.on('data', data => {
            output += data.toString()
        })

        await once(nodeVersion, 'close')
        return {
            statusCode: 200,
            data: output
        }
    }
}