
export default class ErrorControlled {
    public message: string;

    constructor(message: string, public resCode: number = 404) {
        this.resCode = resCode;
        this.message = message;
    }

    public generateExpressResponse(res: any): any {
        return res.status(this.resCode).json({ success: false, message: this.message });
    }
}

export const generateErrorResponse = (res: any, error: any) => {
    if (error instanceof ErrorControlled) return error.generateExpressResponse(res);
    return res.status(500).json({ success: false, message: 'Internal server error not controlled.' });
}