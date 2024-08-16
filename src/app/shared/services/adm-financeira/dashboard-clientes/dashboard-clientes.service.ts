import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StatusPedidoEnum } from './../../../../shared/constants/status-pedido.constant';
import { DashboardClienteEntradaDto, SearchDashboardClientePedidosDto } from './../../../../shared/interfaces/adm-financeiras/dashboard-clientes/dashboard-cliente.dto';
import { API_CONFIG, CURRENT_DATE } from './../../../../../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardClientesService {

  constructor(
    private readonly http: HttpClient,
  ) { }


  getPedidoDashByCliente({
    cliente_id,
    data_inicial = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    data_final = new Date(CURRENT_DATE),
    status = StatusPedidoEnum.FINALIZADO,

  }: SearchDashboardClientePedidosDto): Observable<DashboardClienteEntradaDto[]> {
    const params = new HttpParams()
      .set('cliente_id', cliente_id)
      .set('data_inicial', data_inicial.toDateString())
      .set('data_final', data_final.toDateString())
      .set('status', status);

    console.log(params);

    return this.http.get<DashboardClienteEntradaDto[]>(`${API_CONFIG.baseURL}/financeiro/dashboard-clientes/pedidos`, {
      responseType: 'json',
      params
    });
  }
}
