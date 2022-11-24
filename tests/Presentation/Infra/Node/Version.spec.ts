import { spawn } from 'child_process'
import { once } from 'events'

type ResponseJson<T = any> = { statusCode: number; data?: T }

export type Response = ResponseJson

export interface Controller<T = any> {
  handle(request: T): Promise<Response>
}

export default class NodeVersion implements Controller {
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

describe('Version', () => {
    it('should returns 200 and server node version', async () => {
        const node = new NodeVersion()
        const response = await node.handle()
        expect(response.statusCode).toBe(200)
        expect(response.data).toBeDefined()
    })
})