import { EstoqueLojaDto } from "../estoques/estoque.dto";
import { UserDto } from "../users/user.dto";

export interface ProdutoBasicDto {
    id: string;
    nome: string;
    descricao: string;
    preco_compra: number;
    preco_venda: number;
    imagem_principal?: string | null;
    imagem_principal_url?: string | null;
}

export interface ProdutoDto extends ProdutoBasicDto{
    user_registrou: UserDto;
    estoques: EstoqueLojaDto[];
}

export interface CreateProdutoDto {
    nome: string;
    descricao: string;
    preco_compra: number;
    preco_venda: number;
    imagem_principal_id?: string;
}

export interface UpdateProdutoDto {
    nome: string;
    descricao: string;
    preco_compra: number;
    preco_venda: number;
    imagem_principal_id?: string;
}

export interface SearchProdutoDto{
    nome?: string;
    descricao?: string;
    searchedProduto?: string;
}

export interface RequestEstoqueCreationDto{
    produto_id: string;
    quant_entrada: number;

    nome?: string;
    descricao?: string;
}

