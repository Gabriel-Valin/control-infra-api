import {GetFreeMemoryController} from "@/Presentation/Controller/Infra/Memory/GetFreeMemController"

const makeSut = (): GetFreeMemoryController => {
    const sut = new GetFreeMemoryController()
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