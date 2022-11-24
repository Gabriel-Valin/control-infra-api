export interface QueryNode {
    getNodeVersion(): Promise<string>
}

export default class GetNodeVersionInteractor {
    constructor(private readonly queryNode: QueryNode) { }
    public async perform(): Promise<string> {
        const result = await this.queryNode.getNodeVersion()
        return result
    }
}