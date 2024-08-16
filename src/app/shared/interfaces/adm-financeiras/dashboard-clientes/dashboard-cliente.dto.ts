import { AssinaturasEnum } from './../../../constants/status-assinaturas.constant';
import { StatusPedidoEnum } from './../../../constants/status-pedido.constant';
import { StatusServicoEnum } from './../../../constants/status.constant';

interface SearchDashboardClienteDto {
    cliente_id: string;
    data_inicial?: Date;
    data_final?: Date;
}

export interface SearchDashboardClientePrestacoesServicoDto extends SearchDashboardClienteDto {
    status?: StatusServicoEnum;
}

export interface SearchDashboardClientePedidosDto extends SearchDashboardClienteDto {
    status?: StatusPedidoEnum;
}

export interface SearchDashboardClienteAssinaturasDto extends SearchDashboardClienteDto {
    status?: AssinaturasEnum;
}

export interface DashboardClienteEntradaDto {
    data: Date;
    total: number;
    quantidade: number;
}