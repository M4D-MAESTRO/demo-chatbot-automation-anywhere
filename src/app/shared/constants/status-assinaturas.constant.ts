
export enum AssinaturasEnum {
    ATIVO = 'Ativo', //indica que a assinatura está em vigor e os pagamentos estão sendo processados normalmente
    CANCELADA = 'Cancelada', //indica que a assinatura foi cancelada pelo cliente ou pelo provedor de serviços e não está mais em vigor.
    PENDENTE = 'Pendente', //indica que a assinatura foi criada, mas o pagamento ainda não foi confirmado.
    PAUSADO = 'Pausado', //indica que a assinatura está temporariamente suspensa, mas ainda não foi cancelada ou encerrada.
    EXPIRADO = 'Expirado', //indica que a assinatura não foi renovada após o término do período de validade.
}

export const AssinaturasEnumMenu = [
    { label: AssinaturasEnum.ATIVO, value: AssinaturasEnum.ATIVO },
    { label: AssinaturasEnum.CANCELADA, value: AssinaturasEnum.CANCELADA },
    { label: AssinaturasEnum.PENDENTE, value: AssinaturasEnum.PENDENTE },
    { label: AssinaturasEnum.PAUSADO, value: AssinaturasEnum.PAUSADO },
    { label: AssinaturasEnum.EXPIRADO, value: AssinaturasEnum.EXPIRADO },
];
