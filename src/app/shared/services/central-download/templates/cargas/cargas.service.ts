import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileTemplateCargas } from '../../../../../../app/shared/constants/file-templates.constant';
import { API_CONFIG } from '../../../../../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class DownloadTemplateCargasService {

  constructor(
    private http: HttpClient,
  ) { }

  findCargaTemplate(id: FileTemplateCargas): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${API_CONFIG.baseURL}/templates/cargas/${id}`,
      {
        observe: 'response',
        responseType: 'blob' as 'json',
      });
  }
}
