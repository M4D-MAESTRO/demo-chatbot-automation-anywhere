
export class BrazilianMasksUtils {
    static maskCPF(value: unknown) {
        if (typeof value == 'string' && value.trim().length == 11) {
            let cpf = value.replace(/\D/g, "");
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            return cpf;
        }
        return value;
    }
}