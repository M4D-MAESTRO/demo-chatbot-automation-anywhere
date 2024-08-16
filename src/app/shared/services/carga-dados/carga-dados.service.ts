import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { CargaDadosDto, CargaDadosList, SearchCargasDto } from '../../interfaces/carga-dados/carga-dados.dto';
import { PageableDto, PageOptionsDto } from '../../interfaces/others/pageable.dto';
import { PageUtils } from '../../utils/PageUtils';

@Injectable({
  providedIn: 'root'
})
export class CargaDadosService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  carregarProdutos(anexo: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', anexo);

    return this.http.post<any>(`${API_CONFIG.baseURL}/carga-dados/produtos`, formData);
  }

  carregarEstoques(anexo: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', anexo);

    return this.http.post<any>(`${API_CONFIG.baseURL}/carga-dados/estoques`, formData);
  }

  getCargasList(): Observable<CargaDadosList[]>{
    return this.http.get<CargaDadosList[]>(`${API_CONFIG.baseURL}/carga-dados/enums`, {
      responseType: 'json',
    });
  }

  search(filterDto: SearchCargasDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<CargaDadosDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions)
      .set("user_id", filterDto.user_id)

    if (filterDto.status) {
      params = params.append("status", filterDto.status)
    }

    if (filterDto.data) {
      params = params.append("data", filterDto.data.toString());
    }

    if (filterDto.nome_carga) {
      params = params.append("nome_carga", filterDto.nome_carga);
    }

    return this.http.get<PageableDto<CargaDadosDto>>(`${API_CONFIG.baseURL}/carga-dados`, {
      responseType: 'json',
      params,
    });
  }
}
