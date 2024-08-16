import { EstoqueProduto } from './../../../interfaces/estoques/estoque.dto';

import { Injectable } from '@angular/core';
import { PdvCartDto } from '../../../..//shared/interfaces/cart/cart.dto';
import { ProdutoDto, ProdutoBasicDto } from './../../../interfaces/produtos/produto.dto';

@Injectable({
  providedIn: 'root'
})
export class PdvCartService {

  private cart: PdvCartDto = {
    total: 0,
    //sub_total: 0,
    pedido: {
      cliente_id: undefined,
      loja_id: undefined,
      pagamento_forma: undefined,
      item_produto: [],
      vendedor_id: undefined,
    },
  };

  constructor() { }

  addProduto(estoque: EstoqueProduto, quantidade: number) {
    const { quantidade: quantidade_max } = estoque;
    const { id, preco_venda, nome, imagem_principal_url } = estoque.produto;

    const produtoIndex = this.cart.pedido.item_produto.findIndex(i => i.produto_id == id);
    if (produtoIndex >= 0) {
      this.removProduto(id);
    }

    const sub_total = Number(preco_venda) * Number(quantidade);
    const total = Number(this.cart.total || 0) + sub_total;
    this.cart.pedido.item_produto.push({
      produto_id: id,
      quantidade,
      sub_total,
      valor_unitario: Number(preco_venda),
      nome,
      quantidade_max,
      imagem_principal_url,
      
    });
    this.cart.total = total;
  }

  changeQuantidade(item_id: string, newQuantidade: number) {
    const produtoIndex = this.cart.pedido.item_produto.findIndex(i => i.produto_id == item_id);
    if (produtoIndex < 0) {
      return;
    }

    const produto = this.cart.pedido.item_produto[produtoIndex];

    const sub_total = Number(produto.valor_unitario) * Number(newQuantidade);
    this.cart.total = this.cart.total - produto.sub_total;
    const total = Number(this.cart.total) + sub_total;
    produto.sub_total = sub_total;
    this.cart.pedido.item_produto[produtoIndex] = produto;
    this.cart.total = total;
  }

  removProduto(produto_id: string) {
    const itens = this.getCart().pedido.item_produto;
    const produtoIndex = itens.findIndex(i => i.produto_id == produto_id);
    if (produtoIndex < 0) {
      return;
    }
    const produto = itens[produtoIndex];
    const total = produto.sub_total;
    this.getCart().total = Number(this.getCart().total) - Number(total);

    itens.splice(produtoIndex, 1);
    this.getCart().pedido.item_produto = itens;
  }

  getCart() {
    return this.cart;
  }

  clear() {
    this.cart = {
      total: 0,
      //sub_total: 0,
      pedido: {
        cliente_id: undefined,
        loja_id: undefined,
        pagamento_forma: undefined,
        item_produto: [],
        vendedor_id: undefined,
      },
    };
  }

  getItemProduto() {
    return this.cart.pedido.item_produto.map(i => {
      const { produto_id, quantidade } = i;
      return {
        produto_id,
        quantidade
      }
    });
  }
}
