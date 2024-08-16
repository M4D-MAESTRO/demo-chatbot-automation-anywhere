import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Subscription } from 'rxjs';

import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../shared/constants/toast.constant';
import { UserDto } from './../../../../shared/interfaces/users/user.dto';
import { PasswordService } from './../../../../shared/services/auth/password.service';
import { StorageService } from './../../../../shared/services/auth/storage.service';
import { ToastMessageService } from './../../../../shared/services/toast/toast-message.service';
import { UserService } from './../../../../shared/services/user/user.service';

@Component({
  selector: 'app-user-edit-password',
  templateUrl: './user-edit-password.component.html',
  styleUrls: ['./user-edit-password.component.scss'],
})
export class UserEditPasswordComponent  implements OnInit, OnDestroy {

  @Input()
  isModal = true;

  user: UserDto;

  formGroup: UntypedFormGroup;

  isLoaded = false;
  private subscriptions = new Subscription();

  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly storage: StorageService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly toastMessageService: ToastMessageService,

  ) {
    this.formGroup = this.formBuilder.group({
      senha: ['', [Validators.required, Validators.minLength(8)]],
      senhaR: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  ngOnInit() {
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadUser() {
    const { id } = this.storage.getLocalUser();
    const sub = this.userService.findById(id)
      .subscribe(data => {
        this.user = data;
        this.storage.setCompleteLocalUser(data);
        this.isLoaded = true;
      });

    this.subscriptions.add(sub);
  }


  trocarSenha() {
    const sub = this.userService.updatePassword(this.formGroup.get('senha').value)
      .subscribe(response => {
        this.formGroup.reset();
        this.toastMessageService.presentToast({
          detalhe: 'Senha alterada', duracao: ToastEnum.shortDuration,
          gravidade: ToastPrimeSeverityEnum.SUCESSO, titulo: 'Sucesso!'
        });
      });
    this.subscriptions.add(sub);
  }

  disabledBTN() {
    return !(this.formGroup.valid && this.getSenhas());
  }

  getSenhas() {
    return this.formGroup.get('senha').value == this.formGroup.get('senhaR').value;
  }

}