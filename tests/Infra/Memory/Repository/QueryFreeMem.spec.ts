import QueryFreeMem from "@/Infra/Memory/Repository/QueryFreeMemRepo"

const makeSut = (): QueryFreeMem => {
    const sut = new QueryFreeMem()
    return sut
}

describe('QueryFreeMem', () => {
    it('should return Free Memory from host', async () => {
        const sut = makeSut()
        const result = await sut.getFreeMem()
        expect(result).not.toBeUndefined()
        expect(result.length).toBeGreaterThan(1)
    })
})