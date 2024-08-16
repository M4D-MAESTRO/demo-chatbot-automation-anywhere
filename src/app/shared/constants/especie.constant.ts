
export enum EspecieEnum {
    CANINO = 'CANINO',
    FELINO = 'FELINO',
    ROEDOR = 'ROEDOR',
    AVE = 'AVE',
    OUTROS = 'OUTROS'
}

export const EspeciesOptions = [
    { label: "Canino", value: EspecieEnum.CANINO },
    { label: "Felino", value: EspecieEnum.FELINO },
    { label: "Roedor", value: EspecieEnum.ROEDOR},
    { label: "Ave", value: EspecieEnum.AVE },
    { label: "Outros", value: EspecieEnum.OUTROS },
];