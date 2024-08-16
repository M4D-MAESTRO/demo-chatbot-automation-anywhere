
export class LabelUtils {

    static generateMonthLabel(month: number) {
        const dateStart = new Date();
        dateStart.setDate(1);
        dateStart.setMonth(month);

        const dateEnd = new Date();
        dateEnd.setDate(1);
        dateEnd.setMonth(month + 1);
        dateEnd.setDate(dateEnd.getDate() - 1);

        const endDay = dateEnd.getDate();

        const labels: string[] = [];
        for (let i = 0; i < endDay; i++) {
            const dia = i+1;
            const currentMonth = month + 1 < 10 ? `0${month + 1}` : month + 1
            const currentDay = dia < 10 ? `0${dia}` : dia;

            labels[i] = `${currentDay}/${currentMonth}`;
        }

        return labels;
    }
}