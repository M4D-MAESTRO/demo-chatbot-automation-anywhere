import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';
import { CreateEnderecoDto } from '../../interfaces/enderecos/endereco.dto';
import { PageableDto, PageOptionsDto } from '../../interfaces/others/pageable.dto';
import { CreateUserDto, SearchUserDto, UpdateUserDto, UserDto } from '../../interfaces/users/user.dto';
import { PageUtils } from '../../utils/PageUtils';
import { StringsUtils } from '../../utils/strings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  findById(user_id): Observable<UserDto> {
    return this.http.get<UserDto>(
      `${API_CONFIG.baseURL}/users/${user_id}`,
      {
        responseType: 'json',
      });
  }

  listUsers(searchUserDto: SearchUserDto, pageOptions = new PageOptionsDto()): Observable<PageableDto<UserDto>> {
    let params = PageUtils.getPageOptionsParams(pageOptions);

    if (searchUserDto && searchUserDto.searchedUser) {
      params = params.append('searchedUser', searchUserDto.searchedUser);
    }

    if (searchUserDto && searchUserDto.status) {
      params = params.append('status', searchUserDto.status);
    }

    if (searchUserDto && searchUserDto.nome) {
      params = params.append('nome', searchUserDto.nome);
    }

    if (searchUserDto && searchUserDto.cpf) {
      params = params.append('cpf', searchUserDto.cpf);
    }

    if (searchUserDto && searchUserDto.email) {
      params = params.append('email', searchUserDto.email);
    }

    if (searchUserDto && searchUserDto.loja_id) {
      params = params.append('loja_id', searchUserDto.loja_id);
    }

    if (searchUserDto && searchUserDto.tipo_usuario) {
      params = params.append('tipo_usuario', searchUserDto.tipo_usuario);
    }

    if (searchUserDto &&
      searchUserDto.load_cliente_nao_identificado == false || searchUserDto.load_cliente_nao_identificado == true) {
      params = params.append('load_cliente_nao_identificado', searchUserDto.load_cliente_nao_identificado);
    }

    return this.http.get<PageableDto<UserDto>>(
      `${API_CONFIG.baseURL}/users`,
      {
        responseType: 'json',
        params,
      });
  }

  createUser(dto: CreateUserDto): Observable<UserDto> {
    dto.tel1 = StringsUtils.ClearSpecialCharacters(dto.tel1);
    dto.tel2 = StringsUtils.ClearSpecialCharacters(dto.tel2);

    if (dto.tel2?.length == 0) {
      dto.tel2 = undefined;
    }

    if (!dto.cpf || dto.cpf == '') {
      dto.cpf = undefined;
    }

    if (!dto.identidade || dto.identidade == '') {
      dto.identidade = undefined;
    }

    return this.http.post<UserDto>(
      `${API_CONFIG.baseURL}/users`,
      dto,
      {
        responseType: 'json',
      });
  }

  updateUser(dto: UpdateUserDto, idUser: string): Observable<UserDto> {
    dto.tel1 = StringsUtils.ClearSpecialCharacters(dto.tel1);
    dto.tel2 = StringsUtils.ClearSpecialCharacters(dto.tel2);

    if (dto.tel2?.length == 0) {
      dto.tel2 = undefined;
    }

    return this.http.put<UserDto>(
      `${API_CONFIG.baseURL}/users/${idUser}`,
      dto,
      {
        responseType: 'json',
      });
  }

  createEndereco(newEndereco: CreateEnderecoDto, user_id: string): Observable<any> {
    return this.http.post<any>(
      `${API_CONFIG.baseURL}/users/${user_id}/endereco`,
      newEndereco,
      {
        responseType: 'json',
      });
  }

  updateEndereco(newEndereco: CreateEnderecoDto, user_id: string): Observable<any> {
    return this.http.post<any>(
      `${API_CONFIG.baseURL}/users/${user_id}/endereco`,
      newEndereco,
      {
        responseType: 'json',
      });
  }

  updatePassword(newPassword: string): Observable<any> {
    return this.http.patch<any>(
      `${API_CONFIG.baseURL}/users/password`,
      { senha: newPassword },
      {
        responseType: 'json',
      });
  }

  uploadAvatar(anexo: File, id?: string): Observable<UserDto> {
    const formData = new FormData();

    formData.append('file', anexo);

    const url = id ? `${API_CONFIG.baseURL}/users/${id}/avatar` : `${API_CONFIG.baseURL}/users/avatar`;

    return this.http.patch<UserDto>(url, formData);
  }


}
