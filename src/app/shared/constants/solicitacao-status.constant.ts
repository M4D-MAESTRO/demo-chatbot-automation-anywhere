export enum SolicitacaoStatusEnum {
    PENDENTE = 'PENDENTE',
    APROVADA = 'APROVADA',
    REJEITADA = 'REJEITADA',
    CANCELADA = 'CANCELADA'
}

export const SolicitacaoStatus = [
    {
        label: 'Pendente', 
        value: SolicitacaoStatusEnum.PENDENTE,
    },
    {
        label: 'Aprovada', 
        value: SolicitacaoStatusEnum.APROVADA,
    },
    {
        label: 'Rejeitada', 
        value: SolicitacaoStatusEnum.REJEITADA,
    },
    {
        label: 'Cancelada', 
        value: SolicitacaoStatusEnum.CANCELADA,
    },
]