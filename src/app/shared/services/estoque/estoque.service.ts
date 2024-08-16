import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../../../config/api.config';
import { CreateEntradaDto, EstoqueEntradaDto, EstoqueProduto,  EstoqueSaidaDto, EstoqueUpdatedDto, LojaNaoCadastradaDto } from '../../interfaces/estoques/estoque.dto';
import { PageableDto, PageOptionsDto } from '../../interfaces/others/pageable.dto';
import { SearchProdutoDto } from '../../interfaces/produtos/produto.dto';
import { PageUtils } from '../../utils/PageUtils';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(
    private http: HttpClient,
  ) { }

  listLojasSemProdutoX(produto_id: string): Observable<LojaNaoCadastradaDto[]>{
    return this.http.get<LojaNaoCadastradaDto[]>(
      `${API_CONFIG.baseURL}/estoques/produto/${produto_id}`,
      {
        responseType: 'json'
      }
    );
  }

  findProdutosByLoja(loja_id: string, filterDto?: SearchProdutoDto,pageOptions = new PageOptionsDto()): Observable<PageableDto<EstoqueProduto>>{
    let params = PageUtils.getPageOptionsParams(pageOptions);
    
    if (filterDto && filterDto.nome) {
      params = params.append('nome', filterDto.nome);
    }

    if (filterDto && filterDto.descricao) {
      params = params.append('descricao', filterDto.descricao);
    }

    if (filterDto && filterDto.searchedProduto) {
      params = params.append('searchedProduto', filterDto.searchedProduto);
    }

    return this.http.get<PageableDto<EstoqueProduto>>(
      `${API_CONFIG.baseURL}/estoques/loja/${loja_id}`,
      {
        responseType: 'json',
        params
      }
    );
  }

  createEstoque(dto: CreateEntradaDto): Observable<EstoqueUpdatedDto> {
    return this.http.post<EstoqueUpdatedDto>(
      `${API_CONFIG.baseURL}/estoques`,
      dto,
      {
        responseType: 'json',
      });
  }

  entradaEstoque(dto: EstoqueEntradaDto): Observable<EstoqueUpdatedDto> {
    return this.http.put<EstoqueUpdatedDto>(
      `${API_CONFIG.baseURL}/estoques/entrada/`,
      dto,
      {
        responseType: 'json',
      });
  }

  saidaEstoque(dto: EstoqueSaidaDto): Observable<EstoqueUpdatedDto> {
    return this.http.put<EstoqueUpdatedDto>(
      `${API_CONFIG.baseURL}/estoques/saida/`,
      dto,
      {
        responseType: 'json',
      });
  }

}
