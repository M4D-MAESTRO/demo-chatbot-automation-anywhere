import { ProdutoBasicDto } from './../produtos/produto.dto';


export interface ItemProdutoDto {
    id: string;
    quantidade: number;
    valor_unitario: number;
    sub_total: number;
    produto: ProdutoBasicDto;
}

export interface CreateItemProdutoDto {
    produto_id: string;
    quantidade: number;

    //Uso interno do frontend:
    valor_unitario?: number; 
    sub_total?: number; 
    nome?: string; 
    image_url?: string | null;
    quantidade_max?: number;
    imagem_principal_url?: string;
}