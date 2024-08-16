
export enum StatusPedidoEnum {
    CRIADO = 'CRIADO',
    PENDENTE_ESTOQUE = 'PENDENTE_ESTOQUE',
    PENDENTE_PAGAMENTO = 'PENDENTE_PAGAMENTO',
    PAGO = 'PAGO',
    FATURADO = 'FATURADO',
    ENVIADO = 'ENVIADO',
    ENTREGUE = 'ENTREGUE',
    FINALIZADO = 'FINALIZADO',
    CANCELAMENTO_SOLICITADO = 'CANCELAMENTO_SOLICITADO',
    CANCELADO = 'CANCELADO'
}

export enum LocalPedidoEnum {
    PDV = 'PDV',
    E_COMMERCE = 'E_COMMERCE'
}

export const LocalPedido = [
    { label: "PDV", value: LocalPedidoEnum.PDV },
    { label: "E-Commerce", value: LocalPedidoEnum.E_COMMERCE },
]

export const StatusPedido = [
    { label: "Criado", value: StatusPedidoEnum.CRIADO },
    { label: "Pendente de Estoque", value: StatusPedidoEnum.PENDENTE_ESTOQUE },
    { label: "Pendente de Pagamento", value: StatusPedidoEnum.PENDENTE_PAGAMENTO },
    { label: "Pago", value: StatusPedidoEnum.PAGO },
    { label: "Faturado", value: StatusPedidoEnum.FATURADO },

    { label: "Enviado", value: StatusPedidoEnum.ENVIADO },
    { label: "Entregue", value: StatusPedidoEnum.ENTREGUE },
    { label: "Finalizado", value: StatusPedidoEnum.FINALIZADO },
    { label: "Cancelamento Solicitado", value: StatusPedidoEnum.CANCELAMENTO_SOLICITADO },
    { label: "Cancelado", value: StatusPedidoEnum.CANCELADO },
]
