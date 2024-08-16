
export enum VeiculosCoresEnum {
    BRANCO = "BRANCO",
    CINZA = "CINZA",
    PRETO = "PRETO",
    PRATA = "PRATA",
    AZUL = "AZUL",
    VERMELHO = "VERMELHO",
    MARROM = "MARROM",
    BEGE = "BEGE",
    VERDE = "VERDE",
    AMARELO = "AMARELO",
    OUTROS = "OUTROS",
}

export const VeiculosCoresOptions = Object.keys(VeiculosCoresEnum).map(key => {
    return { label: key.charAt(0) + key.slice(1).toLowerCase(), value: VeiculosCoresEnum[key] };
  });

export enum VeiculosTipoEnum {
    CARRO = "CARRO",
    MOTOCICLETA = "MOTOCICLETA",
    OUTROS = "OUTROS",
}

export const VeiculosTipoOptions = [
    { label: "Carro", value: VeiculosTipoEnum.CARRO },
    { label: "Motocicleta", value: VeiculosTipoEnum.MOTOCICLETA },
    { label: "Outros", value: VeiculosTipoEnum.OUTROS },
];

