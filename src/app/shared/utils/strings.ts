

export class StringsUtils {
    static checkIfEmail(str: string) {
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

        return regexExp.test(str);
    }

    static ClearSpecialCharacters(inputString: string) {
        if (!inputString || inputString.trim().length <= 0) {
            return '';
        }
        const outputString = inputString.replace(/[^a-zA-Z0-9]/g, '').trim();
        return outputString;
    }
}