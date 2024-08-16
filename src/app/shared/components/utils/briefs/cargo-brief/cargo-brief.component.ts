
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { CargoDto } from './../../../../interfaces/cargos/cargo.dto';

@Component({
  selector: 'app-cargo-brief',
  templateUrl: './cargo-brief.component.html',
  styleUrls: ['./cargo-brief.component.scss'],
})
export class CargoBriefComponent implements OnInit {

  @Input()
  cargo: CargoDto;
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
