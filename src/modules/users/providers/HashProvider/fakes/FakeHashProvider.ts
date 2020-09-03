import IHashProvider from '../models/IHashProvider';

// a senha não precisa ser criptografada nos testes
class FakeHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return payload;
    }

    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return payload === hashed;
    }
}

export default FakeHashProvider;
