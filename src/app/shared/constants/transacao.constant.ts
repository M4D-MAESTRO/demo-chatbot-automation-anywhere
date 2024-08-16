
export enum TipoCashEnum {
    CASH_IN = 'CASH_IN',
    CASH_OUT = 'CASH_OUT', 
};

export enum TipoTransacaoEnum {
    ASSINATURA = 'ASSINATURA',
    PRODUTO = 'PRODUTO',
    SERVICO = 'SERVICO',
    DEVOLUCAO = 'DEVOLUCAO',
    INSUMO = 'INSUMO',
    DESPESA = 'DESPESA',
    FUNCIONARIO = 'FUNCIONARIO',
    TERCEIROS = 'TERCEIROS',
    OUTROS = 'OUTROS',
};

export const TipoCash = [
    { label: "Cash In (Entrada)", value: TipoCashEnum.CASH_IN },
    { label: "Cash Out (Saída)", value: TipoCashEnum.CASH_OUT },
]

export const TipoTransacao = [
    { label: "Assinatura", value: TipoTransacaoEnum.ASSINATURA },
    { label: "Produto", value: TipoTransacaoEnum.PRODUTO },
    { label: "Serviço", value: TipoTransacaoEnum.SERVICO },
    { label: "Devolução", value: TipoTransacaoEnum.DEVOLUCAO },
    { label: "Insumo", value: TipoTransacaoEnum.INSUMO },
    { label: "Despesa", value: TipoTransacaoEnum.DESPESA },
    { label: "Funcionário", value: TipoTransacaoEnum.FUNCIONARIO },
    { label: "Terceiros", value: TipoTransacaoEnum.TERCEIROS },
    { label: "Outros", value: TipoTransacaoEnum.OUTROS },
]
