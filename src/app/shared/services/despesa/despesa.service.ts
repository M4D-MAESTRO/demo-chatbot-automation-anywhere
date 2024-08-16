
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../../config/api.config';
import { PageableDto, PageOptionsDto } from './../../interfaces/others/pageable.dto';
import { PageUtils } from '../../utils/PageUtils';
import { CreateDespesaDto, DespesaDto, UpdateDespesaDto } from '../../interfaces/despesas/despesa.dto';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  constructor(
    private http: HttpClient,
  ) { }

  list(pageOptions = new PageOptionsDto()): Observable<PageableDto<DespesaDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    return this.http.get<PageableDto<DespesaDto>>(`${API_CONFIG.baseURL}/despesas`, {
      responseType: 'json',
      params,
    });
  }

  create(newDespesa: CreateDespesaDto): Observable<any> {
    return this.http.post<any>(
      `${API_CONFIG.baseURL}/despesas`,
      newDespesa,
      {
        responseType: 'json',
      });
  }


  update(updatedDespesa: UpdateDespesaDto, despesa_id: string): Observable<DespesaDto> {
    return this.http.put<DespesaDto>(
      `${API_CONFIG.baseURL}/despesas/${despesa_id}`,
      updatedDespesa,
      {
        responseType: 'json',
      });
  }

}
