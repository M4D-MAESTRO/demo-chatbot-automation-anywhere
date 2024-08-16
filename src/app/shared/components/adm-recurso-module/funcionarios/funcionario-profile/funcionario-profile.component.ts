import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

import { UserService } from './../../../../services/user/user.service';
import { UserDto } from './../../../../interfaces/users/user.dto';
import { StorageService } from './../../../../services/auth/storage.service';

@Component({
  selector: 'app-funcionario-profile',
  templateUrl: './funcionario-profile.component.html',
  styleUrls: ['./funcionario-profile.component.scss'],
})
export class FuncionarioProfileComponent implements OnInit, OnDestroy {

  @Input()
  user_id: string;

  @Input()
  enableMessageAndNotification = false;

  @Input()
  showCloseButton = true;

  @Input()
  user: UserDto;

  tabMenu: number = 1;
  tabPerfil: number = 0;
  value1: boolean = false;
  selectedHierarquia: number = 1;

  private subscriptions = new Subscription();

  constructor(
    private readonly userService: UserService,
    private readonly modal: ModalController,
    private readonly storage: StorageService,
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadUser() {
    if (!this.user_id) {
      return;
    }

    this.userService.findById(this.user_id)
      .subscribe(data => {
        this.user = data;
      });
  }

  updateUser(updatedUser: UserDto) {
    this.user = updatedUser;
    const { id: current_user_id } = this.storage.getCompleteLocalUser();
    if (current_user_id == updatedUser.id) {
      this.storage.setCompleteLocalUser(updatedUser);
    }
  }

  fechar() {
    this.modal.dismiss(this.user);
  }
}
