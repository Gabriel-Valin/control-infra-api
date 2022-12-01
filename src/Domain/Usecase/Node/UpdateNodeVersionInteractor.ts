import { NodeVersion } from "@/Domain/ValueObject/NodeVersion";
import { CommandRepo } from "@/Infra/Node/Repository/CommandRepoNode"

export class UpdateNodeVersionInteractor {
    constructor(private readonly commandRepo: CommandRepo) { }
    public async perform(version: NodeVersion): Promise<{ newNodeVersion: string; } | string> {
        const result = await this.commandRepo.updateNodeVersion(version)
        return result
    }
}