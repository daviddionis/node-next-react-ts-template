
export default class ErrorControlled extends Error {
    constructor(message: string, public resCode: number = 404) {
        super(message);
        this.resCode = resCode;
    }

    public generateExpressResponse(res: any): any {
        return res.status(this.resCode).json({ success: false, message: this.message });
    }
}


export const generateErrorResponse = (res: any, error: any) => {
    if (error instanceof ErrorControlled) return error.generateExpressResponse(res);
    return res.status(500).json({ success: false, message: 'Internal server error not controlled.' });
}