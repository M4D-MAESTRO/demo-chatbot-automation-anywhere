import { LojaBasicDto, LojaDto } from "../lojas/loja.dto";
import { ProdutoBasicDto } from "../produtos/produto.dto";

export interface EstoqueBasicDto {
    quantidade: number;
}

export interface EstoqueLojaDto extends EstoqueBasicDto {
    loja: LojaBasicDto;
}

export interface EstoqueProdutoDto extends EstoqueBasicDto {
    loja: ProdutoBasicDto;
}

export interface EstoqueEntradaDto {
    produto_id: string;
    loja_id: string;
    quant_entrada: number;
}

export interface EstoqueSaidaDto {
    produto_id: string;
    loja_id: string;
    quant_saida: number;
}

export interface EstoqueUpdatedDto{
    quantidade_atualizada: number;
}

export interface LojaNaoCadastradaDto{
    id: string;
    nome: string;
    descricao?: string;
    codigo: string;
}

export interface CreateEntradaDto {
    produto_id: string;
    loja_id: string;
}


export interface EstoqueProduto{
    quantidade: number;
    produto: ProdutoBasicDto;
}

