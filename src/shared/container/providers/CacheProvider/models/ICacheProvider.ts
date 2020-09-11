export default interface ICacheProvider {
    save(key: string, value: string): Promise<void>; // salva
    recover(key: string): Promise<string | null>; // busca
    invalidate(key: string): Promise<void>; // deleta
}
