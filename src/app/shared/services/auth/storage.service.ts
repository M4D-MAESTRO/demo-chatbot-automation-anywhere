import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { STORAGE_KEYS } from 'src/config/storageKeys.config';
import { LocalUserDto } from 'src/app/shared/interfaces/authentication/local-user.dto'
import { UserDto } from '../../interfaces/users/user.dto';
import { ApiDto } from '../../interfaces/api/api.dto';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private wsIsActive = false;

  constructor() { }

  getLocalUser(): LocalUserDto {
    const user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user == null) {
      return null;
    }
    else {
      return JSON.parse(user);
    }
  }

  setLocalUser(obj: LocalUserDto) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }


  getCompleteLocalUser(): UserDto {
    const user = localStorage.getItem(STORAGE_KEYS.user);
    if (user == null) {
      return null;
    }
    else {
      return JSON.parse(user);
    }
  }

  setCompleteLocalUser(obj: UserDto) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.user);
    }
    else {
      if (!obj.avatar_url) {
        obj.avatar_url = "assets/imgs/outros/default-user.jpg";
      }
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(obj));
    }
  }

  isLogedIn() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.localUser));
    if (user) {
      return true;
    } else {
      return false;
    }
  }


  isLogedInObs(): Observable<boolean> {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.localUser));
    if (user) {
      return of(true);
    } else {
      return of(false);
    }
  }

  getRole(): string {
    const localUser: LocalUserDto = JSON.parse(localStorage.getItem(STORAGE_KEYS.localUser)) as LocalUserDto;
    const { perfil_nome } = localUser;

    return perfil_nome;
  }

  turnWsOn() {
    this.wsIsActive = true;
  }

  getWs() {
    return this.wsIsActive;
  }

}
