const { spawn } = require('node:child_process')
const { once } = require('events')

class NodeVersion {
    async getVersion() {
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

const n = new NodeVersion()
n.getVersion().then(e => console.log(e))