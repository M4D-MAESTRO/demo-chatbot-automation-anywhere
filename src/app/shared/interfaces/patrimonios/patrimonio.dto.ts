import { LojaDto } from '../lojas/loja.dto';

export interface PatrimonioDto {
    id: string;
    nome: string;
    id_fisico: string | null;
    descricao: string;
    valor_patrimonio: number;
    status_patrimonio: string;
    loja: LojaDto;
}

export interface CreatePatrimonioDto {
    nome: string;
    descricao: string;
    valor_patrimonio: number;
    loja_id: string;
    id_fisico: string;
}

export interface UpdatePatrimonioDto {
    nome: string;
    descricao: string;
    valor_patrimonio: number;
    loja_id: string;
    id_fisico: string;
    status_patrimonio: string;
}


export interface SearchPatrimonioDto {
    loja_id?: string;
    searchedPatrimonio?: string;
    nome?: string;
    descricao?: string;
    valor_patrimonio?: number;
    status_patrimonio?: string;
}
