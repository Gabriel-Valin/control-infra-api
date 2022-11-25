import { freemem } from "os"

export interface FreeMem {
    getFreeMem(): Promise<{ freeMem: string }>
}

export default class QueryFreeMem implements FreeMem {
    public async getFreeMem(): Promise<{ freeMem: string }> {
        const freeMem = freemem()
        const convertToMB = Math.round(((freeMem / 1024) / 1024) / 1024).toPrecision(2)
        return {
            freeMem: `${convertToMB.toString()} GB`
        }
    }
}