import { DomainError } from "@/Presentation/Error/DomainError"

export class NodeVersion {
    constructor(private readonly version: string) {
        const allowedVersions = ['18', '16', '14']
        const expectedValue = allowedVersions.includes(version)
        if (!expectedValue) {
            throw new DomainError("VersionNotAccepted")
        }

        this.version = version
    }

    public toString(): string {
        return this.version
    }
}