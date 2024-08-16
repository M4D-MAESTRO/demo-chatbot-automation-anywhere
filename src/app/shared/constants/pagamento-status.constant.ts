
export enum PagamentoStatusEnum {
    SOLICITADO = 'SOLICITADO',  // Pagamento solicitado
    EM_ANDAMENTO = 'EM_ANDAMENTO', // Pagamento em andamento
    PENDENTE = 'PENDENTE', // Pagamento pendente
    FALHA = 'FALHA', // Falha no pagamento
    PAGO_PARCIALMENTE = 'PAGO_PARCIALMENTE', // Pagamento realizado parcialmente
    ATRASADO = 'ATRASADO', // Pagamento atrasado
    AGUARDANDO_AUTORIZACAO = 'AGUARDANDO_AUTORIZACAO', // Aguardando autorização do pagamento
    AGUARDANDO_CONFIRMACAO = 'AGUARDANDO_CONFIRMACAO', // Aguardando confirmação do pagamento

    REJEITADO = 'REJEITADO', // Pagamento rejeitado
    CANCELADO = 'CANCELADO', // Pagamento cancelado
    CONCLUIDO = 'CONCLUIDO', // Pagamento concluído
}


export const PagamentoStatus = [
    { label: "Solicitado", value: PagamentoStatusEnum.SOLICITADO },
    // { label: "Em andamento", value: PagamentoStatusEnum.EM_ANDAMENTO },
    { label: "Pendente", value: PagamentoStatusEnum.PENDENTE },
    { label: "Falha", value: PagamentoStatusEnum.FALHA },
    //  { label: "Pago Parcialmente", value: PagamentoStatusEnum.PAGO_PARCIALMENTE },
    { label: "Atrasado", value: PagamentoStatusEnum.ATRASADO },
    // { label: "Aguardando Autorização", value: PagamentoStatusEnum.AGUARDANDO_AUTORIZACAO },
    // { label: "Aguardando Confirmação", value: PagamentoStatusEnum.AGUARDANDO_CONFIRMACAO },
    { label: "Rejeitado", value: PagamentoStatusEnum.REJEITADO },
    { label: "Cancelado", value: PagamentoStatusEnum.CANCELADO },
    { label: "Concluído", value: PagamentoStatusEnum.CONCLUIDO },
];