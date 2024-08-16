import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG, CURRENT_DATE } from '../../../../../config/api.config';
import { PageUtils } from '../../../utils/PageUtils';
import { PageableDto, PageOptionsDto } from '../../../interfaces/others/pageable.dto';
import { SearchTransacaoDto, TransacaoDto } from './../../../../shared/interfaces/adm-financeiras/transacoes/transacao.dto';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  list(filterDto: SearchTransacaoDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<TransacaoDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (filterDto) {

      if (filterDto.created_at) {
        params = params.append('created_at', filterDto.created_at.toDateString());
      }

      if (filterDto.condominio_id) {
        params = params.append('condominio_id', filterDto.condominio_id);
      }

      if (filterDto.cliente_id) {
        params = params.append('cliente_id', filterDto.cliente_id);
      }

      if (filterDto.max_valor_transacao) {
        params = params.append('max_valor_transacao', filterDto.max_valor_transacao);
      }

      if (filterDto.solicitante_id) {
        params = params.append('solicitante_id', filterDto.solicitante_id);
      }

      if (filterDto.tipo_cash) {
        params = params.append('tipo_cash', filterDto.tipo_cash);
      }

      if (filterDto.tipo_transacao) {
        params = params.append('tipo_transacao', filterDto.tipo_transacao);
      }

      if (filterDto.searchedCliente) {
        params = params.append('searchedCliente', filterDto.searchedCliente);
      }

      if (filterDto.searchedCondominio) {
        params = params.append('searchedCondominio', filterDto.searchedCondominio);
      }

      if (filterDto.searchedSolicitante) {
        params = params.append('searchedSolicitante', filterDto.searchedSolicitante);
      }

      if (filterDto.searchedTransacao) {
        params = params.append('searchedTransacao', filterDto.searchedTransacao);
      }
    }

    return this.http.get<PageableDto<TransacaoDto>>(`${API_CONFIG.baseURL}/financeiro/transacoes/list`, {
      responseType: 'json',
      params,
    });
  }

  findById(id: string): Observable<TransacaoDto> {
    return this.http.get<TransacaoDto>(`${API_CONFIG.baseURL}/financeiro/transacoes/${id}`, {
      responseType: 'json',
    });
  }
}
