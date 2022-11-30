import {CpuInfoController} from "@/Presentation/Controller/Infra/CPU/CpuInfoController"

const makeSut = (): CpuInfoController => {
    const sut = new CpuInfoController()
    return sut
}

describe('Version', () => {
    it('should returns 200 and server node version', async () => {
        const sut = makeSut()
        const response = await sut.handle()
        expect(response.statusCode).toBe(200)
        expect(response.data).toBeDefined()
    })
})