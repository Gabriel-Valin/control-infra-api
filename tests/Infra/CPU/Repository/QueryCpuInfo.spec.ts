import QueryCpuInfo from "@/Infra/CPU/Repository/QueryCpuInfo"

const makeSut = (): QueryCpuInfo => {
    const sut = new QueryCpuInfo()
    return sut
}

describe('QueryCpuInfo', () => {
    it('should returns host CPU infos', async () => {
        const sut = makeSut()
        const result = await sut.getCpuInfo()
        expect(result).toBeDefined()
        expect(result.length).toBeGreaterThan(0)
    })
})