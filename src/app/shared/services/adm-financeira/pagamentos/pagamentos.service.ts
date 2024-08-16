import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PageableDto, PageOptionsDto } from '../../../interfaces/others/pageable.dto';
import { PageUtils } from '../../../utils/PageUtils';
import { API_CONFIG } from '../../../../../config/api.config';
import { CreatePagamentoDto, PagamentoDto, PatchComprovanteToPagamentoDto, SearchPagamentoDto } from './../../../interfaces/adm-financeiras/pagamentos/pagamento.dto';
import { ArquivoGeralDto } from './../../../../shared/interfaces/arquivos/arquivo-geral.dto';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {


  constructor(
    private readonly http: HttpClient,
  ) { }

  list(filterDto?: SearchPagamentoDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<PagamentoDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (filterDto) {
      if (filterDto.created_at) {
        params = params.append('created_at', filterDto.created_at.toDateString());
      }

      if (filterDto.max_custo) {
        params = params.append('max_custo', filterDto.max_custo);
      }

      if (filterDto.max_data_vencimento) {
        params = params.append('max_data_vencimento', filterDto.max_data_vencimento.toDateString());
      }

      if (filterDto.min_custo) {
        params = params.append('min_custo', filterDto.min_custo);
      }

      if (filterDto.min_data_vencimento) {
        params = params.append('min_data_vencimento', filterDto.min_data_vencimento.toDateString());
      }

      if (filterDto.operacao_id) {
        params = params.append('operacao_id', filterDto.operacao_id);
      }

      if (filterDto.searchedOperacao) {
        params = params.append('searchedOperacao', filterDto.searchedOperacao);
      }

      if (filterDto.searchedSolicitante) {
        params = params.append('searchedSolicitante', filterDto.searchedSolicitante);
      }

      if (filterDto.solicitante_id) {
        params = params.append('solicitante_id', filterDto.solicitante_id);
      }

      if (filterDto.status) {
        params = params.append('status', filterDto.status.join(','));
      }
    }

    return this.http.get<PageableDto<PagamentoDto>>(`${API_CONFIG.baseURL}/financeiro/pagamentos`, {
      responseType: 'json',
      params,
    });
  }

  findById(id: string): Observable<PagamentoDto> {
    return this.http.get<PagamentoDto>(`${API_CONFIG.baseURL}/financeiro/pagamentos/${id}`, {
      responseType: 'json',
    });
  }

  create(dto: CreatePagamentoDto): Observable<PagamentoDto> {
    return this.http.post<PagamentoDto>(
      `${API_CONFIG.baseURL}/financeiro/pagamentos`,
      dto,
      {
        responseType: 'json',
      });
  }

  createComprovante(anexo: File): Observable<ArquivoGeralDto> {
    const formData = new FormData();

    formData.append('file', anexo);

    return this.http.post<ArquivoGeralDto>(
      `${API_CONFIG.baseURL}/financeiro/pagamentos/anexos/comprovantes`,
      formData,
      {
        responseType: 'json',
      });
  }

  associarComprovante(id: string, dto: PatchComprovanteToPagamentoDto): Observable<PagamentoDto> {
    return this.http.patch<PagamentoDto>(
      `${API_CONFIG.baseURL}/financeiro/pagamentos/${id}/anexar/comprovante`,
      dto,
      {
        responseType: 'json',
      });
  }

  createContaOriginal(anexo: File): Observable<ArquivoGeralDto> {
    const formData = new FormData();

    formData.append('file', anexo);

    return this.http.post<ArquivoGeralDto>(
      `${API_CONFIG.baseURL}/financeiro/pagamentos/anexos/contas`,
      formData,
      {
        responseType: 'json',
      });
  }

  associarContaOriginal(id: string, dto: PatchComprovanteToPagamentoDto): Observable<PagamentoDto> {
    return this.http.patch<PagamentoDto>(
      `${API_CONFIG.baseURL}/financeiro/pagamentos/${id}/anexar/contas`,
      dto,
      {
        responseType: 'json',
      });
  }

  concluirPagamento(id: string): Observable<PagamentoDto> {
    return this.http.patch<PagamentoDto>(
      `${API_CONFIG.baseURL}/financeiro/pagamentos/${id}/concluir`,
      {
        responseType: 'json',
      });
  }

}
