import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from './../../../../config/api.config';
import { PageableDto, PageOptionsDto } from '../../interfaces/others/pageable.dto';
import { PerfilDto, SearchPerfilDto } from '../../interfaces/perfis/perfil.dto';
import { PageUtils } from '../../utils/PageUtils';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private http: HttpClient,
  ) { }

  list(pageOptions = new PageOptionsDto(), options?: SearchPerfilDto): Observable<PageableDto<PerfilDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);
    
    if (options) { 
      params = params.append('with_usuario', options.with_usuario.toString());
    }

    return this.http.get<PageableDto<PerfilDto>>(`${API_CONFIG.baseURL}/perfis`, {
      responseType: 'json',
      params,
    });
  }
}
