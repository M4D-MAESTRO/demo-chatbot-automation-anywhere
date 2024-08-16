export enum ChamadoStatusEnum {
    ABERTO = 'ABERTO',
    ANDAMENTO = 'ANDAMENTO',
    PENDENTE = 'PENDENTE',
    CONCLUIDO = 'CONCLUIDO',
    CANCELADO = 'CANCELADO',
}

export enum ChamadoTipoEnum {
    MANUTENCAO = 'MANUTENCAO',
    EMPRESA = 'EMPRESA',
    ASSEMBLEIA = 'ASSEMBLEIA',
    PROCESSO_JUDICIAL = 'PROCESSO_JUDICIAL',
    ADMINISTRACAO = 'ADMINISTRACAO',
}

export const ChamadoStatusList = [
    { label: "Aberto", value: ChamadoStatusEnum.ABERTO },
    { label: "Andamento", value: ChamadoStatusEnum.ANDAMENTO },
    { label: "Pendente", value: ChamadoStatusEnum.PENDENTE },
    { label: "Concluído", value: ChamadoStatusEnum.CONCLUIDO },
    { label: "Cancelado", value: ChamadoStatusEnum.CANCELADO },
]

export const ChamadoTipoList = [
    { label: "Administração", value: ChamadoTipoEnum.ADMINISTRACAO },
    { label: "Assembléia", value: ChamadoTipoEnum.ASSEMBLEIA },
    { label: "Empresa", value: ChamadoTipoEnum.EMPRESA },
    { label: "Manutenção", value: ChamadoTipoEnum.MANUTENCAO },
    { label: "Processo Judicial", value: ChamadoTipoEnum.PROCESSO_JUDICIAL },
]