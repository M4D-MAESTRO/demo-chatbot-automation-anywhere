import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../../config/api.config';
import { CreateEnderecoDto } from '../../interfaces/enderecos/endereco.dto';
import { CreateLojaDto, LojaDto, SearchLojaDto, UpdateLojaDto } from '../../interfaces/lojas/loja.dto';
import { PageableDto, PageOptionsDto } from '../../interfaces/others/pageable.dto';
import { PageUtils } from '../../utils/PageUtils';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(
    private http: HttpClient,
  ) { }

  list(filterDto?: SearchLojaDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<LojaDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (filterDto && filterDto.searchedLoja) {
      params = params.append('searchedLoja', filterDto.searchedLoja);
    }
    if (filterDto && filterDto.codigo) {
      params = params.append('codigo', filterDto.codigo);
    }
    if (filterDto && filterDto.descricao) {
      params = params.append('descricao', filterDto.descricao);
    }
    if (filterDto && filterDto.nome) {
      params = params.append('nome', filterDto.nome);
    }

    return this.http.get<PageableDto<LojaDto>>(`${API_CONFIG.baseURL}/lojas`, {
      responseType: 'json',
      params,
    });
  }

  create(newLoja: CreateLojaDto): Observable<LojaDto> {
    return this.http.post<LojaDto>(
      `${API_CONFIG.baseURL}/lojas`,
      newLoja,
      {
        responseType: 'json',
      });
  }

  update(updatedLoja: UpdateLojaDto, Loja_id: string): Observable<LojaDto> {
    return this.http.put<LojaDto>(
      `${API_CONFIG.baseURL}/lojas/${Loja_id}`,
      updatedLoja,
      {
        responseType: 'json',
      });
  }

  createOrUpdateEndereco(loja_id: string, newEndereco: CreateEnderecoDto): Observable<any> {
    return this.http.post<any>(
      `${API_CONFIG.baseURL}/lojas/${loja_id}/endereco`,
      newEndereco,
      {
        responseType: 'json',
      });
  }
}
