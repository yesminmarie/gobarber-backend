class AppError {
    public readonly message: string; // apenas leitura, não é possível setar um valor

    public readonly statusCode: number; // apenas leitura, não é possível setar um valor

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;
