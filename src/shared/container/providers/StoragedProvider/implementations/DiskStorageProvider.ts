import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        // rename é a forma de mover um arquivo de uma pasta para outra
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file), // move da pasta tmp (tmpFolder está no arquivo upload dentro da pasta config)
            path.resolve(uploadConfig.uploadsFolder, file), // para a pasta uploads
        );

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            // se encontrar o arquivo (stat retorna informações do arquivo)
            await fs.promises.stat(filePath);
        } catch {
            return; // se não encontrar o arquivo, a função para por aqui
        }

        // se o arquivo foi encontrado, ele é deletado
        await fs.promises.unlink(filePath);
    }
}

export default DiskStorageProvider;
