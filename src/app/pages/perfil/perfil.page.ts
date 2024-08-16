import { StorageService } from './../../shared/services/auth/storage.service';
import { UserDto } from './../../shared/interfaces/users/user.dto';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: UserDto

  constructor(
    private readonly storage: StorageService,
  ) {}

  ngOnInit() {
   this.user = this.storage.getCompleteLocalUser();
  }


}
