export interface QueryNode {
    getNodeVersion(): Promise<{ nodeVersion: string }>
}

export class GetNodeVersionInteractor {
    constructor(private readonly queryNode: QueryNode) { }
    public async perform(): Promise<{ nodeVersion: string }> {
        const result = await this.queryNode.getNodeVersion()
        return result
    }
}