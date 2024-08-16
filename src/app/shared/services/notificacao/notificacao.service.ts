import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';

import { BasicNotificacaoDto } from '../../interfaces/others/notificacao.dto';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(
    private http: HttpClient,
  ) { }

  listSelf(): Observable<BasicNotificacaoDto[]> {
    return this.http.get<BasicNotificacaoDto[]>(`${API_CONFIG.baseURL}/notificacoes`, {
      responseType: 'json',
    });
  }

  listByUser(user_id: string): Observable<BasicNotificacaoDto[]> {
    return this.http.get<BasicNotificacaoDto[]>(`${API_CONFIG.baseURL}/notificacoes/${user_id}`, {
      responseType: 'json',
    });
  }

  markAsReadById(id: string): Observable<BasicNotificacaoDto[]> {
    return this.http.patch<BasicNotificacaoDto[]>(`${API_CONFIG.baseURL}/notificacoes/${id}/read`, {
      responseType: 'json',
    });
  }

  markAsUnreadById(id: string): Observable<BasicNotificacaoDto[]> {
    return this.http.patch<BasicNotificacaoDto[]>(`${API_CONFIG.baseURL}/notificacoes/${id}/unread`, {
      responseType: 'json',
    });
  }

}
