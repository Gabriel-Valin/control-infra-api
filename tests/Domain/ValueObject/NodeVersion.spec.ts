import { NodeVersion } from "@/Domain/ValueObject/NodeVersion"
import { DomainError } from "@/Presentation/Error/DomainError"

describe('NodeVersion', () => {
    it('should return ThisVersionNotAccepted if version provided is wrong', async () => {
        expect(() => new NodeVersion('12')).toThrow()
    })

    it('should has toString method to get a value if version is acceptable', async () => {
        const method = new NodeVersion('18')
        expect(method.toString()).toBe('18')
    })
})