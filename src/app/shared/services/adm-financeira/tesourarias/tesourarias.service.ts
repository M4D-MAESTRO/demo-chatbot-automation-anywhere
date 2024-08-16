import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG, CURRENT_DATE } from '../../../../../config/api.config';
import { PageUtils } from '../../../utils/PageUtils';
import { PageableDto, PageOptionsDto } from '../../../interfaces/others/pageable.dto';
import { SearchTesourariaDto, TesourariaDto } from './../../../../shared/interfaces/adm-financeiras/tesourarias/tesouraria.dto';

@Injectable({
  providedIn: 'root'
})
export class TesourariasService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  list(filterDto: SearchTesourariaDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<TesourariaDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (filterDto) {

      if (filterDto.created_at) {
        params = params.append('created_at', filterDto.created_at.toDateString());
      }

      /*if (filterDto.selected_month) {
        params = params.append('selected_month', filterDto.selected_month.toDateString());
      }*/

      if (filterDto.condominio_id) {
        params = params.append('condominio_id', filterDto.condominio_id);
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

    return this.http.get<PageableDto<TesourariaDto>>(`${API_CONFIG.baseURL}/financeiro/tesourarias/loja/list`, {
      responseType: 'json',
      params,
    });
  }

  findById(id: string): Observable<TesourariaDto> {
    return this.http.get<TesourariaDto>(`${API_CONFIG.baseURL}/financeiro/tesourarias/loja/${id}`, {
      responseType: 'json',
    });
  }

  findByLojaAndDate(condominio_id: string, date: Date = new Date(CURRENT_DATE)): Observable<TesourariaDto> {
    const params = new HttpParams()
      .set('condominio_id', condominio_id)
      .set('date', date.toDateString());

    return this.http.get<TesourariaDto>(`${API_CONFIG.baseURL}/financeiro/tesourarias/loja`, {
      responseType: 'json',
      params
    });
  }
}
