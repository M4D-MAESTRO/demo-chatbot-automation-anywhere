import { UserDto } from '../../users/user.dto';

export interface ContaClienteDto {
    id: string;
    cliente: UserDto;

    created_at: Date;
    updated_at: Date;
    short_date: string;

    assinatura_compra_valor: number;
    assinatura_compra_quantidade: number;
    produto_compra_valor: number;
    produto_compra_quantidade: number;
    servico_tomado_valor: number;
    servico_tomado_quantidade: number;
    cash_in_valor: number;
    cash_in_quantidade: number;
    devolucao_out_valor: number;
    devolucao_out_quantidade: number;
    cash_out_valor: number;
    cash_out_quantidade: number;
    cash_total_valor: number;
}

export interface SearchContaClienteDto {
    created_at?: Date;
    selected_month?: Date;

    loja_id?: string;
    Cliente_id?: string;

    min_cash_in?: number;
    max_cash_in?: number;
    min_cash_out?: number;
    max_cash_out?: number;
    min_cash_total?: number;
    max_cash_total?: number;
}