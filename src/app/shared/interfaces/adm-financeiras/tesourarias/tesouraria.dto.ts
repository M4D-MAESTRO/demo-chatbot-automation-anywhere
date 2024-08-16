import { LojaDto } from '../../lojas/loja.dto';

export interface TesourariaDto {
    id: string;
    loja: LojaDto;

    created_at: Date;
    updated_at: Date;

    //CASH IN
    assinatura_venda_valor: number;
    assinatura_venda_quantidade: number;
    produto_venda_valor: number;
    produto_venda_quantidade: number;
    servico_prestado_valor: number;
    servico_prestado_quantidade: number;
    devolucao_in_valor: number;
    devolucao_in_quantidade: number;
    cash_in_valor: number;
    cash_in_quantidade: number;

    //CASH OUT
    insumo_compra_valor: number;
    insumo_compra_quantidade: number;
    produto_compra_valor: number;
    produto_compra_quantidade: number;
    pagamento_despesa_valor: number;
    pagamento_despesa_quantidade: number;
    pagamento_funcionario_valor: number;
    pagamento_funcionario_quantidade: number;
    pagamento_evento_valor: number;
    pagamento_evento_quantidade: number;
    pagamento_terceiros_valor: number;
    pagamento_terceiros_quantidade: number;
    pagamento_outros_valor: number;
    pagamento_outros_quantidade: number;
    devolucao_out_valor: number;
    devolucao_out_quantidade: number;
    cash_out_valor: number;
    cash_out_quantidade: number;

    cash_total_valor: number;
}

export interface SearchTesourariaDto {
    created_at?: Date;
    //selected_month?: Date;

    loja_id?: string;

    min_cash_in?: number;
    max_cash_in?: number;
    min_cash_out?: number;
    max_cash_out?: number;
    min_cash_total?: number;
    max_cash_total?: number;
}