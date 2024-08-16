import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDto } from '../../interfaces/api/api.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly http: HttpClient,
  ) { }


  getApiVersion(): Observable<ApiDto> {
    return this.http.get<ApiDto>(
      `${API_CONFIG.baseURL}/`,
      {
        responseType: 'json',
      }
    );
  }
}
