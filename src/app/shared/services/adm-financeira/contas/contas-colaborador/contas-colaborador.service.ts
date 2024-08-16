import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG, CURRENT_DATE } from '../../../../../../config/api.config';
import { PageUtils } from '../../../../utils/PageUtils';
import { PageableDto, PageOptionsDto } from '../../../../interfaces/others/pageable.dto';
import { ContaColaboradorDto, SearchContaColaboradorDto } from '../../../../interfaces/adm-financeiras/contas/conta-colaborador.dto';

@Injectable({
  providedIn: 'root'
})
export class ContasColaboradorService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  list(filterDto: SearchContaColaboradorDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<ContaColaboradorDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (filterDto) {
      if (filterDto.colaborador_id) {
        params = params.append('colaborador_id', filterDto.colaborador_id);
      }

      if (filterDto.created_at) {
        params = params.append('created_at', filterDto.created_at.toDateString());
      }

      if (filterDto.selected_month) {
        params = params.append('selected_month', filterDto.selected_month.toDateString());
      }

      if (filterDto.loja_id) {
        params = params.append('loja_id', filterDto.loja_id);
      }

      if (filterDto.max_cash_out) {
        params = params.append('max_cash_out', filterDto.max_cash_out);
      }

      if (filterDto.min_cash_out) {
        params = params.append('min_cash_out', filterDto.min_cash_out);
      }

      if (filterDto.max_cash_in) {
        params = params.append('max_cash_in', filterDto.max_cash_in);
      }

      if (filterDto.min_cash_in) {
        params = params.append('min_cash_in', filterDto.min_cash_in);
      }

      if (filterDto.max_cash_out) {
        params = params.append('max_cash_out', filterDto.max_cash_out);
      }

      if (filterDto.min_cash_out) {
        params = params.append('min_cash_out', filterDto.min_cash_out);
      }

      if (filterDto.max_cash_total) {
        params = params.append('max_cash_total', filterDto.max_cash_total);
      }

      if (filterDto.min_cash_total) {
        params = params.append('min_cash_total', filterDto.min_cash_total);
      }
    }

    return this.http.get<PageableDto<ContaColaboradorDto>>(`${API_CONFIG.baseURL}/financeiro/contas/colaborador/list`, {
      responseType: 'json',
      params,
    });
  }

  findById(id: string): Observable<ContaColaboradorDto> {
    return this.http.get<ContaColaboradorDto>(`${API_CONFIG.baseURL}/financeiro/contas/colaborador/${id}`, {
      responseType: 'json',
    });
  }

  findByColaboradorAndDate(colaborador_id: string, date: Date = new Date(CURRENT_DATE)): Observable<ContaColaboradorDto> {
    const params = new HttpParams()
      .set('colaborador_id', colaborador_id)
      .set('date', date.toDateString());

    return this.http.get<ContaColaboradorDto>(`${API_CONFIG.baseURL}/financeiro/contas/colaborador/`, {
      responseType: 'json',
      params
    });
  }

}
