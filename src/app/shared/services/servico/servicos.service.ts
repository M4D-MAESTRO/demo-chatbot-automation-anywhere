import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from 'src/config/api.config';
import { PageableDto, PageOptionsDto } from '../../interfaces/others/pageable.dto';
import { BasicServicoReturnDto, CreateServicosDto, SearchServicosDto, ServicosDto } from '../../interfaces/servicos/servicoes.dto';
import { PageUtils } from '../../utils/PageUtils';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  constructor(
    private http: HttpClient,
  ) { }

  create(dto: CreateServicosDto): Observable<ServicosDto> {
    return this.http.post<ServicosDto>(
      `${API_CONFIG.baseURL}/servicos`,
      dto,
      {
        responseType: 'json',
      }
    );
  }

  update(id: string, dto: CreateServicosDto): Observable<ServicosDto> {
    return this.http.put<ServicosDto>(
      `${API_CONFIG.baseURL}/servicos/${id}`,
      dto,
      {
        responseType: 'json',
      }
    );
  }

  list(filterDto?: SearchServicosDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<ServicosDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (filterDto && filterDto.searchedServico) {
      params = params.append('searchedServico', filterDto.searchedServico);
    }

    if (filterDto && filterDto.nome) {
      params = params.append('nome', filterDto.nome);
    }

    if (filterDto && filterDto.descricao) {
      params = params.append('descricao', filterDto.descricao);
    }

    return this.http.get<PageableDto<ServicosDto>>(`${API_CONFIG.baseURL}/servicos`, {
      responseType: 'json',
      params,
    });
  }

  listBasic(): Observable<BasicServicoReturnDto[]> {
    return this.http.get<BasicServicoReturnDto[]>(`${API_CONFIG.baseURL}/servicos/basic/list`, {
      responseType: 'json',
    });
  }

  findById(id: string): Observable<ServicosDto> {
    return this.http.get<ServicosDto>(`${API_CONFIG.baseURL}/servicos/${id}`, {
      responseType: 'json',
    });
  }

}
