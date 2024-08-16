import { UserDto } from "../users/user.dto";


export interface DespesaDto{
    id: string;
    nome: string;
	descricao: string;
    user_registrou: UserDto;
}


export interface CreateDespesaDto{
    nome: string;
    descricao: string;
}


export interface UpdateDespesaDto{
    nome: string;
    descricao: string;
}