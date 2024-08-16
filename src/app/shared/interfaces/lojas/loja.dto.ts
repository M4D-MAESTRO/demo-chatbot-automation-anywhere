import { EstoqueMode } from "../../constants/estoque.constant";
import { EnderecoDto } from "../enderecos/endereco.dto";
import { EstoqueProdutoDto } from "../estoques/estoque.dto";
import { RequestEstoqueCreationDto } from "../produtos/produto.dto";

export interface LojaBasicDto {
    id: string;
    codigo: string;
    nome: string;
    descricao: string;
    endereco?: EnderecoDto;

    valor_tesouraria: number;
    valor_receber: number;
    valor_saida: number;
}

export interface LojaDto extends LojaBasicDto {
    endereco?: EnderecoDto
    estoques?: EstoqueProdutoDto;
}

export interface CreateLojaDto {
    codigo: string;
    nome: string;
    descricao: string;
    estoque_mode: EstoqueMode;
    produtos?: RequestEstoqueCreationDto[];
}

export interface UpdateLojaDto {
    codigo: string;
    nome: string;
    descricao: string;
}

export interface SearchLojaDto {
    nome?: string;
    descricao?: string;
    searchedLoja?: string;
    codigo?: string;
}

