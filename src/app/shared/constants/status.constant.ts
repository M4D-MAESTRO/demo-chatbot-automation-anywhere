

export const StatusTransacao = [
  { nome: "PENDENTE", value: 0 },
  { nome: "REJEITADO", value: 1 },
  { nome: "APROVADO", value: 2 },
];

export enum CargaStatus {
  FALHA = "FALHA",
  EM_EXECUCAO = "EM EXECUCAO",
  CONCLUIDO = "CONCLUIDO",
};

export enum StatusUsuarioEnum {
  ATIVO = 'ATIVO',
  AFASTADO = 'AFASTADO',
  FERIAS = 'FERIAS',
  DESLIGADO = 'DESLIGADO',
  DELETADO = 'DELETADO',
};

export const StatusUser = [
  { label: "Ativo", value: StatusUsuarioEnum.ATIVO },
  { label: "Afastado", value: StatusUsuarioEnum.AFASTADO },
  { label: "Férias", value: StatusUsuarioEnum.FERIAS },
  { label: "Desligado", value: StatusUsuarioEnum.DESLIGADO },
  { label: "Deletado", value: StatusUsuarioEnum.DELETADO },
];

export const StatusCliente = [
  { label: "Ativo", value: StatusUsuarioEnum.ATIVO },
  { label: "Inativo", value: StatusUsuarioEnum.DELETADO },
];

enum StatusPatrimonioEnum {
  ATIVO = 'ATIVO',
  EM_MANUTENCAO = 'EM MANUTENCAO',
  VENDIDO = 'VENDIDO',
  FORA_DE_OPERACAO = 'FORA DE OPERACAO',
};


export const StatusPatrimonio = [
  { nome: "ATIVO", value: StatusPatrimonioEnum.ATIVO },
  { nome: "EM_MANUTENCAO", value: StatusPatrimonioEnum.EM_MANUTENCAO },
  { nome: "VENDIDO", value: StatusPatrimonioEnum.VENDIDO },
  { nome: "FORA_DE_OPERACAO", value: StatusPatrimonioEnum.FORA_DE_OPERACAO },
];

export enum StatusServicoEnum {
  INICIADO = 'INICIADO',
  AGENDADO = 'AGENDADO',
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO',
};

export const StatusServico = [
  { label: "Iniciado", value: StatusServicoEnum.INICIADO },
  { label: "Agendar", value: StatusServicoEnum.AGENDADO },
  { label: "Finalizado", value: StatusServicoEnum.FINALIZADO },
  { label: "Cancelado", value: StatusServicoEnum.CANCELADO },
];
export const StatusServicoWithNoCancelOption = [
  { label: "Iniciado", value: StatusServicoEnum.INICIADO },
  { label: "Agendar", value: StatusServicoEnum.AGENDADO },
  { label: "Finalizado", value: StatusServicoEnum.FINALIZADO },
];