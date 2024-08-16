import { PagamentoStatusEnum } from './../../../constants/pagamento-status.constant';
import { DespesaDto } from "../../despesas/despesa.dto";
import { SolicitacaoDto } from "../../fluxo-pagamentos/solicitacoes/solicitacao.dto";
import { TipoOperacaoSaidaDto } from "../../fluxo-pagamentos/tipos-operacao-saida/tipo-operacao-saida.dto";
import { UserDto } from "../../users/user.dto";

export interface PagamentoDto {
    id: string;
    valor: number;
    data_pagamento: Date;
    data_vencimento: Date;

    conta_original: string;
    conta_original_url: string;
    comprovante?: string;
    comprovante_url: string;

    status: PagamentoStatusEnum;
    pagador?: UserDto;
    operacao: TipoOperacaoSaidaDto;
    solicitacao?: SolicitacaoDto;
    solicitante?: UserDto;
    despesa?: DespesaDto;
}

export interface CreatePagamentoDto {
    custo: number;
    conta_original_id: string;
    comprovante_id?: string;
    operacao_id: string;
    despesa_id?: string;
    data_vencimento: Date;
}

export interface SearchPagamentoDto {

    created_at?: Date;
    operacao_id?: string;
    solicitante_id?: string;
    searchedOperacao?: string;
    searchedSolicitante?: string;

    status?: PagamentoStatusEnum[];
    min_custo?: number;
    max_custo?: number;
    min_data_vencimento?: Date;
    max_data_vencimento?: Date;
}

export interface PatchComprovanteToPagamentoDto {
    comprovante_id: string;
}

