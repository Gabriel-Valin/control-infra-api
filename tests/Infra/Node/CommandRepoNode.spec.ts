import CommandRepoNode from "@/Infra/Node/Repository/CommandRepoNode"

const makeSut = (): CommandRepoNode => {
    const sut = new CommandRepoNode()
    return sut
}

describe('CommandRepoNode', () => {
    it('should returns node error message if invalid version is provided', async () => {
        const sut = makeSut()
        const nodeVersion = await sut.updateNodeVersion(101010)
        expect(nodeVersion).toBe('Invalid Node Version, please install first or typing correctly version.')
    })

    it('should returns new default shell node version', async () => {
        const sut = makeSut()
        const nodeVersion = await sut.updateNodeVersion(18)
        expect(nodeVersion).toHaveProperty('newNodeVersion')
    })
})