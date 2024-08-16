import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG, CURRENT_DATE } from '../../../../../config/api.config';
import { PageUtils } from '../../../utils/PageUtils';
import { PageableDto, PageOptionsDto } from '../../../interfaces/others/pageable.dto';
import { SearchTesourariaEmpresaDto, TesourariaEmpresaDto } from './../../../../shared/interfaces/adm-financeiras/tesourarias-empresa/tesourarias-empresa.dto';

@Injectable({
  providedIn: 'root'
})
export class TesourariasEmpresaService {


  constructor(
    private readonly http: HttpClient,
  ) { }

  list(filterDto: SearchTesourariaEmpresaDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<TesourariaEmpresaDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (filterDto) {

      if (filterDto.created_at) {
        params = params.append('created_at', filterDto.created_at.toDateString());
      }

      /*if (filterDto.selected_month) {
        params = params.append('selected_month', filterDto.selected_month.toDateString());
      }*/

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

    return this.http.get<PageableDto<TesourariaEmpresaDto>>(`${API_CONFIG.baseURL}/financeiro/tesourarias/empresa/list`, {
      responseType: 'json',
      params,
    });
  }

  findById(id: string): Observable<TesourariaEmpresaDto> {
    return this.http.get<TesourariaEmpresaDto>(`${API_CONFIG.baseURL}/financeiro/tesourarias/empresa/${id}`, {
      responseType: 'json',
    });
  }

  findByDate(date: Date = new Date(CURRENT_DATE)): Observable<TesourariaEmpresaDto> {
    const params = new HttpParams()
      .set('date', date.toDateString());

    return this.http.get<TesourariaEmpresaDto>(`${API_CONFIG.baseURL}/financeiro/tesourarias/empresa/`, {
      responseType: 'json',
      params
    });
  }
}
