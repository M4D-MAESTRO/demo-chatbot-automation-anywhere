import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private http: HttpClient
  ) { }

  requestReset(email: string) {
    return this.http.post(
      `${API_CONFIG.baseURL}/auth/forgot`,
      {
        email,
      },
      {
        responseType: 'json',
      }
    );
  }

  doReset(token: string, senha: string) {
    const params = new HttpParams()
      .set("token", token);

    return this.http.post(
      `${API_CONFIG.baseURL}/auth/reset`,
      {
        password: senha,
      },
      {
        params,
      }
    );
  }


  change(senha: string) {
    return this.http.patch(
      `${API_CONFIG.baseURL}/password/change`,
      {
        senha,
      }
    );
  }


}
