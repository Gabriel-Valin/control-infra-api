import CommandRepoNode, { CommandRepo } from "@/Infra/Node/Repository/CommandRepoNode"

export default class UpdateNodeVersionInteractor {
    constructor(private readonly commandRepo: CommandRepo) { }
    public async perform(version: number): Promise<{ newNodeVersion: string; } | string> {
        const result = await this.commandRepo.updateNodeVersion(version)
        return result
    }
}