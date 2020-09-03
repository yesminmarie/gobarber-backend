export default interface IHashProvider {
    generateHash(payload: string): Promise<string>; // método para gerar um hash a partir de uma string qualquer (payload)
    compareHash(payload: string, hashed: string): Promise<boolean>; // compara um texto qualquer com algo que já foi "hashed"(criptografado) anteriormente retornando true ou false
}
