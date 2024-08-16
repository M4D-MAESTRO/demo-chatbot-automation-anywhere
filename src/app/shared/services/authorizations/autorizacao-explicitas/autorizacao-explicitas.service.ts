
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../../../config/api.config';
import { PageUtils } from '../../../utils/PageUtils';
import { PageableDto, PageOptionsDto } from '../../../interfaces/others/pageable.dto';
import { AutorizacaoExplicitaDto, CreateAutorizacaoExplicitaDto, SearchAutorizacaoExplicitaDto } from './../../../interfaces/authorizations/autorizacao-explicita.dto';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoExplicitasService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  //#region autorizacoes-explicita
  list(searchDto: SearchAutorizacaoExplicitaDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<AutorizacaoExplicitaDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (searchDto && searchDto.searchedAutorizacaoExplicita) {
      params = params.append('searchedAutorizacaoExplicita', searchDto.searchedAutorizacaoExplicita);
    }

    if (searchDto && searchDto.searchedAutorizado) {
      params = params.append('searchedAutorizado', searchDto.searchedAutorizado);
    }

    if (searchDto && searchDto.searchedAutorizador) {
      params = params.append('searchedAutorizador', searchDto.searchedAutorizador);
    }


    return this.http.get<PageableDto<AutorizacaoExplicitaDto>>(`${API_CONFIG.baseURL}/autorizacoes-explicita`, {
      responseType: 'json',
      params,
    });
  }

  findById(id: string): Observable<AutorizacaoExplicitaDto> {
    return this.http.get<AutorizacaoExplicitaDto>(`${API_CONFIG.baseURL}/autorizacoes-explicita/${id}`, {
      responseType: 'json',
    });
  }
  //#endregion


  //#region users
  listByUserAutorizadoId(id: string): Observable<AutorizacaoExplicitaDto[]> {
    return this.http.get<AutorizacaoExplicitaDto[]>(`${API_CONFIG.baseURL}/autorizacoes-explicita/users/${id}`, {
      responseType: 'json',
    });
  }

  createForUser(id: string, dto: CreateAutorizacaoExplicitaDto): Observable<AutorizacaoExplicitaDto[]> {
    return this.http.post<AutorizacaoExplicitaDto[]>(`${API_CONFIG.baseURL}/autorizacoes-explicita/users/${id}`,
      dto,
      {
        responseType: 'json',
      });
  }
  //#endregion


  //#region cargos
  listByCargoAutorizadoId(id: string): Observable<AutorizacaoExplicitaDto[]> {
    return this.http.get<AutorizacaoExplicitaDto[]>(`${API_CONFIG.baseURL}/autorizacoes-explicita/cargos/${id}`, {
      responseType: 'json',
    });
  }

  createForCargo(id: string, dto: CreateAutorizacaoExplicitaDto): Observable<AutorizacaoExplicitaDto[]> {
    return this.http.post<AutorizacaoExplicitaDto[]>(`${API_CONFIG.baseURL}/autorizacoes-explicita/cargos/${id}`,
      dto,
      {
        responseType: 'json',
      });
  }
  //#endregion
}
