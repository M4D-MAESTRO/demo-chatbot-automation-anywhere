
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { UserDto } from './../../../../interfaces/users/user.dto';

@Component({
  selector: 'app-colaborador-brief',
  templateUrl: './colaborador-brief.component.html',
  styleUrls: ['./colaborador-brief.component.scss'],
})
export class ColaboradorBriefComponent implements OnInit {

  @Input()
  user: UserDto;

  hasUpdate = false;

  constructor(
    private readonly modal: ModalController,
    private readonly toastMessageService: ToastMessageService,
  ) { }

  ngOnInit() {
    this.toastMessageService.clearToast();
  }
  //TODO - Fazer os outros detalhamentos (briefs) e implementar a relação hierarquica na criação e atualização de area, cargo e user

  async fechar() {
    await this.modal.dismiss(this.hasUpdate);
  }

}
