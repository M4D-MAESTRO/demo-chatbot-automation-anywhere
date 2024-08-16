
export enum OpcoesAcrescimoDescontoEnum {
    NAO = 'NAO',
    DESCONTO = 'DESCONTO',
    ACRESCIMO = 'ACRESCIMO'
};

export enum OpcoesTipoEnum {
    FIXO = 'FIXO',
    PERCENTUAL = 'PERCENTUAL'
};

export const OpcoesAcrescimoDesconto = [
    {
        label: 'Não',
        value: OpcoesAcrescimoDescontoEnum.NAO
    },
    {
        label: 'Desconto',
        value: OpcoesAcrescimoDescontoEnum.DESCONTO
    },
    {
        label: 'Acréscimo',
        value: OpcoesAcrescimoDescontoEnum.ACRESCIMO
    }
];

export const OpcoesTipo = [
    {
        label: 'Fixo',
        value: OpcoesTipoEnum.FIXO
    },
    {
        label: 'Percentual',
        value: OpcoesTipoEnum.PERCENTUAL
    }
];