export interface NotaDto {
    versao: string;
    data_lancamento: Date;

    nome?: string;
    descricao?: string;

    novas_features: string[];
    melhorias: string[];
    correcoes: string[];
}