
import { ComponentProps, ComponentRef } from '@ionic/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';
import { ChamadoDto } from './../../../../interfaces/chamados/chamado.dto';

@Component({
  selector: 'app-chamado-detail',
  templateUrl: './chamado-detail.component.html',
  styleUrls: ['./chamado-detail.component.scss'],
})
export class ChamadoDetailComponent implements OnInit, OnDestroy {

  @Input()
  chamado: ChamadoDto

  private subscriptions = new Subscription();

  constructor(
    private readonly modalCadastro: ModalController,
    private readonly toastService: ToastMessageService,
    ) { }

  ngOnInit() {
    console.log(this.chamado);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  get currentFoto() {
    return this.chamado?.foto || undefined;
  }


  isEmptyList(list: string[]) {
    if (!list || list.length <= 0) {
      return true;
    }

    return false;
  }

  fechar() {
    this.modalCadastro.dismiss();
  }

}
