
import { TipoUsuarioEnum } from "../../constants/tipo-user.constant";
import { EnderecoDto } from "../enderecos/endereco.dto";
import { LojaDto } from "../lojas/loja.dto";
import { PerfilDto } from "../perfis/perfil.dto";

export interface UserDto {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    identidade: string;

    tel1: string;
    tel2?: string;
    data_nascimento: Date;

    avatar?: string;
    avatar_url?: string | null;
    status: string;
    socket_id: string | null;
    perfil: PerfilDto | null;
    endereco: EnderecoDto | null;
    loja: LojaDto | null;

}

export interface LabedUser extends UserDto {
    label: string;
}

export interface CreateUserDto {
    nome: string;
    email: string;
    senha?: string;
    cpf: string;
    // condominio_id: string;
    perfil_id: string;
    identidade: string;
    tel1: string;
    tel2?: string;
    data_nascimento: Date;
}

export interface UpdateUserDto {
    nome?: string;
    status?: string;
    // condominio_id?: string;
    perfil_id?: string;
    identidade?: string;
    tel1: string;
    tel2?: string;
    data_nascimento: Date;
}

export interface SearchUserDto {
    loja_id?: string;
    searchedUser?: string;
    nome?: string;
    email?: string;
    cpf?: string;
    status?: string;
    tipo_usuario?: TipoUsuarioEnum;
    load_cliente_nao_identificado?: boolean;
}

