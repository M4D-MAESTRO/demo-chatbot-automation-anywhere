import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable, ReplaySubject } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { StorageService } from './storage.service';
import { PreferencesService } from '../preferences/preferences.service';
import { StartSocketService } from '../../webSocket/start/start-socket.service';
import { CredenciaisDto } from '../../interfaces/authentication/credencias.dto';
import { LocalUserDto, SuccessLoginDto } from '../../interfaces/authentication/local-user.dto';
import { UserService } from '../user/user.service';
import { ApiDto } from '../../interfaces/api/api.dto';
import { UserDto } from '../../interfaces/users/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    private readonly preferencesService: PreferencesService,
    private readonly startSocketService: StartSocketService,
    private readonly userService: UserService,
  ) { }


  authenticate(credenciais: CredenciaisDto): Observable<SuccessLoginDto> {
    return this.http.post<SuccessLoginDto>(`${API_CONFIG.baseURL}/auth/login`, credenciais, {
      responseType: 'json',
    });
  }

  refreshToken(): Observable<any> {
    try {
      const token = {
        token: this.storage.getLocalUser().refresh_token
      };

      return this.http.post<any>(
        `${API_CONFIG.baseURL}/auth/refresh`,
        token,
        {
          responseType: 'json',
        }
      );
    } catch (e) {
    }
  }

  async loginSucesso(loginDto: SuccessLoginDto) {
    //email, perfil_id, perfil_nome, avatar, id, nome
    const { email, perfil_id, perfil_nome, avatar, id, nome } = jwt_decode(loginDto.token) as any;

    const localUser: LocalUserDto = {
      email, perfil_id, perfil_nome, avatar, id, nome,
      refresh_token: loginDto.refresh_token
    }
    this.storage.setLocalUser(localUser);
    const data = await this.userService.findById(id).toPromise();
    this.storage.setCompleteLocalUser(data);

    this.startSocketService.emitNewConnection(id);
  }

  logout() {
    //this.preferencesService.setThemePreference('light');
    this.storage.setLocalUser(null);
    this.storage.setCompleteLocalUser(null);
  }



  fakeLogin(): Observable<any> {
    const obs = new ReplaySubject(1);
 
     const loginDto: SuccessLoginDto = {
       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxoY2NvcnJlYUBob3RtYWlsLmNvbSIsInBlcmZpbF9pZCI6ImI2OTIzZDliLTllYjQtNGFiZS1iZWE3LTBmZjk3YzRlMDU1OSIsInBlcmZpbF9ub21lIjoiQURNSU4tVEkiLCJhdmF0YXIiOiI4ZmMxYjAzZWRiMGZhOTg5OWU2ZDg0ZWZhZjcxYWE2Mi5qcGVnIiwiaWQiOiJiZDU1NmZkZC0zM2MzLTRmYWUtYmMxNS1mZDUzYzhmZTk3MzUiLCJub21lIjoiTHXDrXMgSGVucmlxdWUgZGUgQyBDb3Jyw6phIiwiaWF0IjoxNzA5OTIxNTU0LCJleHAiOjE3MDk5MjI0NTQsInN1YiI6ImJkNTU2ZmRkLTMzYzMtNGZhZS1iYzE1LWZkNTNjOGZlOTczNSJ9.EPexiH5fZ9PxkhN2ffdT3O4EnHmicHfO_9BSTjXxtms',
       refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxoY2NvcnJlYUBob3RtYWlsLmNvbSIsInBlcmZpbF9pZCI6ImI2OTIzZDliLTllYjQtNGFiZS1iZWE3LTBmZjk3YzRlMDU1OSIsInBlcmZpbF9ub21lIjoiQURNSU4tVEkiLCJhdmF0YXIiOiI4ZmMxYjAzZWRiMGZhOTg5OWU2ZDg0ZWZhZjcxYWE2Mi5qcGVnIiwiaWQiOiJiZDU1NmZkZC0zM2MzLTRmYWUtYmMxNS1mZDUzYzhmZTk3MzUiLCJub21lIjoiTHXDrXMgSGVucmlxdWUgZGUgQyBDb3Jyw6phIiwiaWF0IjoxNzA5OTIxNTU0LCJleHAiOjE3MTI1MTM1NTQsInN1YiI6ImJkNTU2ZmRkLTMzYzMtNGZhZS1iYzE1LWZkNTNjOGZlOTczNSJ9.qg8PXE25rkzk4xWQrFWE7h8BbmBZAn22JbtHCuGOT8c'
     }
 
     const { email, perfil_id, perfil_nome, avatar, id, nome } = jwt_decode(loginDto.token) as any;
 
     const localUser: LocalUserDto = {
       email, perfil_id, perfil_nome, avatar, id, nome,
       refresh_token: loginDto.refresh_token
     }
     this.storage.setLocalUser(localUser);
 
     const data: UserDto = {
       "id": "e011ab87-e577-4ac5-afac-8ce39f976901",
       "nome": "super-admin",
       "email": "super-admin@dominio.com",
       "cpf": "000000000",
       "avatar": null,
       "status": "ATIVO",
       "socket_id": null,
       "perfil": {
         "id": "b6923d9b-9eb4-4abe-bea7-0ff97c4e0559",
         "nome": "ADMIN-TI",
         "descricao": "Responsável pela administração do sistema e suas manutenções"
       },
       "endereco": null,
       "loja": {
         "id": "79593d1f-e54f-4e7b-a6f4-2f6b0248d838",
         "codigo": "000",
         "nome": "Administração T.I (NÃO UTILIZAR)",
         "descricao": "Administração T.I (NÃO UTILIZAR)",
         "valor_tesouraria": 5703,
         "valor_receber": 0,
         "valor_saida": 0,
         "endereco": null
       },
       "avatar_url": "assets/imgs/outros/default-user.jpg",
       data_nascimento: new Date(1997, 9, 3),
       identidade: '400092',
       tel1: '21999999999',
     }     
     this.storage.setCompleteLocalUser(data);

     obs.next(true);
     return obs;
   }
}
