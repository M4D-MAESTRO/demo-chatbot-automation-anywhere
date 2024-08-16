
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../../../config/api.config';
import { PageUtils } from '../../../utils/PageUtils';
import { PageableDto, PageOptionsDto } from '../../../interfaces/others/pageable.dto';
import { FuncionalidadeDto, SearchFuncionalidadeDto } from './../../../interfaces/authorizations/funcionalidade.dto';

@Injectable({
  providedIn: 'root'
})
export class FuncionalidadesService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  list(searchDto: SearchFuncionalidadeDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<FuncionalidadeDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (searchDto && searchDto.nome) {
      params = params.append('nome', searchDto.nome);
    }

    if (searchDto && searchDto.descricao) {
      params = params.append('descricao', searchDto.descricao);
    }

    if (searchDto && searchDto.searchedFuncionalidade) {
      params = params.append('searchedFuncionalidade', searchDto.searchedFuncionalidade);
    }
    return this.http.get<PageableDto<FuncionalidadeDto>>(`${API_CONFIG.baseURL}/funcionalidades`, {
      responseType: 'json',
      params,
    });
  }

  findById(id: string): Observable<FuncionalidadeDto> {
    return this.http.get<FuncionalidadeDto>(`${API_CONFIG.baseURL}/funcionalidades/${id}`, {
      responseType: 'json',
    });
  }

}
