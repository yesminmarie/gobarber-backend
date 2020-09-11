export default interface ICacheProvider {
    save(key: string, value: any): Promise<void>; // salva
    recover<T>(key: string): Promise<T | null>; // busca
    invalidate(key: string): Promise<void>; // deleta
    invalidatePrefix(prefix: string): Promise<void>; // deleta todos os caches que começam com determinado texto
}
