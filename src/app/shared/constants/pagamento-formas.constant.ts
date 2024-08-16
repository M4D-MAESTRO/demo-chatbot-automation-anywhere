export enum PagamentoFormasEnum {
    DINHEIRO = 'DINHEIRO',
    CARTAO_CREDITO = 'CARTAO_CREDITO',
    CARTAO_DEBITO = 'CARTAO_DEBITO',
    PIX = 'PIX',
    BOLETO = 'BOLETO',
  }

export const PagamentoFormasMenu = [
  {
    label: 'Dinheiro',
    value: PagamentoFormasEnum.DINHEIRO
  },
  {
    label: 'Cartão de Crédito',
    value: PagamentoFormasEnum.CARTAO_CREDITO
  },
  {
    label: 'Cartão de Débito',
    value: PagamentoFormasEnum.CARTAO_DEBITO
  },
  {
    label: 'PIX',
    value: PagamentoFormasEnum.PIX
  },
  {
    label: 'Boleto',
    value: PagamentoFormasEnum.BOLETO
  },
]