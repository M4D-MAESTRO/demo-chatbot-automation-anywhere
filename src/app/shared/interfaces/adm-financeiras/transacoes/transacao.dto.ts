import { TipoCashEnum, TipoTransacaoEnum } from './../../../constants/transacao.constant';
import { CondominioDto } from '../../condominios/condominio.dto';
import { UserDto } from './../../../../shared/interfaces/users/user.dto';
import { PrestacaoServicoDto } from '../../servicos/prestacao-servico.dto';

export interface TransacaoDto {
    id: string;
    tipo_cash: TipoCashEnum;
    tipo_transacao: TipoTransacaoEnum;
    valor_transacao: number;
    solicitante: UserDto;
    condominio: CondominioDto;
    cliente?: UserDto;
    created_at: Date;
    updated_at: Date;

    prestacao_servico?: PrestacaoServicoDto;
}

export interface SearchTransacaoDto {
    created_at?: Date;
    condominio_id?: string;
    solicitante_id?: string;
    cliente_id?: string;
    tipo_cash?: TipoCashEnum;
    tipo_transacao?: TipoTransacaoEnum;
    min_valor_transacao?: number;
    max_valor_transacao?: number;
    searchedTransacao?: string;
    searchedCondominio?: string;
    searchedSolicitante?: string;
    searchedCliente?: string;
}
