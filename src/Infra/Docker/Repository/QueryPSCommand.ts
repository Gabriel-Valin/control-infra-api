import { InfraError } from "@/Presentation/Error/InfraError"
import { spawn } from "child_process"
import { once } from "events"

export interface QueryPSDocker {
    getContainers(all?: boolean): Promise<any[]>
}

export class QueryPSCommand implements QueryPSDocker {
    public async getContainers(all?: boolean): Promise<any[]> {
        try {
            let output = ''
            const formatResult = "--no-trunc --format '{{ json . }}' | jq -s 'map({id:.ID,network:.Networks,runningFor:.RunningFor,state:.State,name:.Names,status:.Status})'"
            const allContainers = all ? `-a ${formatResult}` : formatResult
            
            const containersList = spawn('docker ps', [allContainers], {
                shell: true
            })
            
            containersList.stdout.setEncoding('utf-8')
            containersList.stdout.on('data', data => {
                output += data.toString()
            })

            await once(containersList, 'close')
            const parseToObject = JSON.parse(output)
            return Array.from(parseToObject)
        } catch (error) {
            throw new InfraError("Have error on node version command")
        }
        
    }
}
