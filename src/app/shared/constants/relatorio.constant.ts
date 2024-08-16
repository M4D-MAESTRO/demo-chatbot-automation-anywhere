enum ReportEnum {
    SALDO_LOCAL_TRANSACAO = 2,
    SALDO_LOCAL_DIA = 3,
    FECHAMENTO_DIA = 4,
    FECHAMENTO_DIA_TOTAL = 5
}

export const Relatorios = [
    /* {
         label: 'Saldo por local e transação',
         value: ReportEnum.SALDO_LOCAL_TRANSACAO,
     },
     {
         label: 'Saldo por local e dia',
         value: ReportEnum.SALDO_LOCAL_DIA,
     },*/
    {
        label: 'Fechamento do Dia - Operador',
        value: ReportEnum.FECHAMENTO_DIA,
    },
    {
        label: 'Fechamento do Dia - Gerente',
        value: ReportEnum.FECHAMENTO_DIA_TOTAL,
    }
];