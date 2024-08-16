
export interface ErrorContentDto{
    title: string;
    message: string;
    code: number;
}

export class ErrorContentControlDto{
    code: number;
    hasError: boolean;

    constructor(){
        this.code = undefined;
        this.hasError = false;
    }
}