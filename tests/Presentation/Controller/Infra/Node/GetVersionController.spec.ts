import GetVersion from "@/Presentation/Controller/Infra/Node/GetVersion"

const makeSut = (): GetVersion => {
    const sut = new GetVersion()
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