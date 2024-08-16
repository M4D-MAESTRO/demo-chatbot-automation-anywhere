
export class DateUtils {
    static getShortDate(date: Date): string {
        if (date.toString().toLowerCase().includes('inva')) {
            return null;
        }

        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const tempMonth = date.getMonth() + 1;
        const month = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
        return `${day}/${month}`;
    }

    static calcularIntervaloDoMes(data: Date) {
        const dataInicial = new Date(data);
        const ano = dataInicial.getFullYear();
        const mes = dataInicial.getMonth();

        // Primeiro dia do mês
        const data_inicial = new Date(ano, mes, 1);

        // Último dia do mês
        const data_final = new Date(ano, mes + 1, 0);

        return { data_inicial, data_final };
    }
}