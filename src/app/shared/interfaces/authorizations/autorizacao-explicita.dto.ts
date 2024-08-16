import { UserDto } from '../users/user.dto';
import { FuncionalidadeDto } from './funcionalidade.dto';

export interface AutorizacaoExplicitaDto {
    id: string;
    justificativa: string;
    user_autorizado: UserDto;
    funcionalidade: FuncionalidadeDto;
    user_registrou: UserDto;
    created_at: Date;
}

export interface CreateAutorizacaoExplicitaDto{
    justificativa: string;
    funcionalidades_id?: string[];
}

export interface SearchAutorizacaoExplicitaDto{
    searchedAutorizado?: string;
    searchedAutorizador?: string;
    searchedAutorizacaoExplicita?: string;
}

