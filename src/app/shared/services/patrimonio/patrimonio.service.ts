import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../../config/api.config';
import { PageableDto, PageOptionsDto } from '../../interfaces/others/pageable.dto';
import { CreatePatrimonioDto, PatrimonioDto, SearchPatrimonioDto, UpdatePatrimonioDto } from '../../interfaces/patrimonios/patrimonio.dto';
import { PageUtils } from '../../utils/PageUtils';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {

  constructor(
    private http: HttpClient,
  ) { }

  list(searchPatrimonioDto: SearchPatrimonioDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<PatrimonioDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (searchPatrimonioDto && searchPatrimonioDto.searchedPatrimonio) {
      params = params.append('searchedPatrimonio', searchPatrimonioDto.searchedPatrimonio);
    }

    if (searchPatrimonioDto && searchPatrimonioDto.descricao) {
      params = params.append('descricao', searchPatrimonioDto.descricao);
    }

    if (searchPatrimonioDto && searchPatrimonioDto.nome) {
      params = params.append('nome', searchPatrimonioDto.nome);
    }

    if (searchPatrimonioDto && searchPatrimonioDto.loja_id) {
      params = params.append('loja_id', searchPatrimonioDto.loja_id);
    }

    if (searchPatrimonioDto && searchPatrimonioDto.status_patrimonio) {
      params = params.append('status_patrimonio', searchPatrimonioDto.status_patrimonio);
    }

    if (searchPatrimonioDto && searchPatrimonioDto.valor_patrimonio) {
      params = params.append('valor_patrimonio', searchPatrimonioDto.valor_patrimonio);
    }

    return this.http.get<PageableDto<PatrimonioDto>>(`${API_CONFIG.baseURL}/patrimonios`, {
      params,
    });
  }

  create(newPatrimonio: CreatePatrimonioDto): Observable<any> {
    return this.http.post<any>(
      `${API_CONFIG.baseURL}/patrimonios`,
      newPatrimonio,
      {
        responseType: 'json',
      });
  }
  //TODO - Implementar o update
  update(patrimonio_id: string, newPatrimonio: UpdatePatrimonioDto): Observable<any> {
    return this.http.put<any>(
      `${API_CONFIG.baseURL}/patrimonios/${patrimonio_id}`,
      newPatrimonio,
      {
        responseType: 'json',
      });
  }

  associate(patrimonio_id: string, id_fisico: string): Observable<any> {
    return this.http.patch<any>(
      `${API_CONFIG.baseURL}/patrimonios/sync/associar/${patrimonio_id}`,
      {
        id_fisico
      },
      {
        responseType: 'json',
      });
  }

  desassociar(patrimonio_id: string): Observable<any> {
    return this.http.patch<any>(
      `${API_CONFIG.baseURL}/patrimonios/sync/desassociar/${patrimonio_id}`,
      {
        responseType: 'json',
      });
  }
}
