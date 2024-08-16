import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { AreaDto } from './../../../../interfaces/areas/area.dto';

@Component({
  selector: 'app-area-brief',
  templateUrl: './area-brief.component.html',
  styleUrls: ['./area-brief.component.scss'],
})
export class AreaBriefComponent implements OnInit {

  @Input()
  area: AreaDto;
  hasUpdate = false;

  constructor(
    private readonly modal: ModalController,
    private readonly toastMessageService: ToastMessageService,
  ) { }

  ngOnInit() {
    this.toastMessageService.clearToast();
  }
  async fechar() {
    await this.modal.dismiss(this.hasUpdate);
  }

}
