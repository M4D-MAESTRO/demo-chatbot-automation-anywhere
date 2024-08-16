
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Estados } from '../../../../shared/constants/estado.constant';
import { UserService } from '../../../../shared/services/user/user.service';
import { LojaService } from '../../../services/loja/loja.service';
import { LojaDto } from '../../../interfaces/lojas/loja.dto';
import { UserDto } from './../../../interfaces/users/user.dto';
import { ToastMessageService } from './../../../services/toast/toast-message.service';
import { ToastEnum, ToastPrimeSeverityEnum } from '../../../../shared/constants/toast.constant';

@Component({
  selector: 'app-update-endereco',
  templateUrl: './update-endereco.component.html',
  styleUrls: ['./update-endereco.component.scss'],
})
export class UpdateEnderecoComponent implements OnInit, OnDestroy {

  @Input()
  currentEndereco: UserDto | LojaDto;

  @Input()
  isFuncionario: boolean;

  @Input()
  isModal = true;

  @Output()
  updatedEvent: EventEmitter<any> = new EventEmitter();

  form: UntypedFormGroup;

  listEstados = Estados;

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly userService: UserService,
    private readonly modal: ModalController,
    private readonly lojaService: LojaService,
    private readonly toastService: ToastMessageService,
  ) {
  }
  ngOnInit() {
    const { cep, endereco, numero, complemento, bairro, cidade, estado } = this.currentEndereco.endereco;

    this.form = this.formBuilder.group({
      cep: [cep, [Validators.required]],
      endereco: [endereco, [Validators.required]],
      numero: [numero, [Validators.required,]],
      complemento: [complemento, [Validators.required,]],
      bairro: [bairro, [Validators.required,]],
      cidade: [cidade, [Validators.required,]],
      estado: [estado, [Validators.required,]],
    });

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  update() {
    const { id } = this.currentEndereco;
    const cep = this.form.get('cep').value;
    const endereco = this.form.get('endereco').value;
    const numero = this.form.get('numero').value;
    const complemento = this.form.get('complemento').value;
    const bairro = this.form.get('bairro').value;
    const cidade = this.form.get('cidade').value;
    console.log(this.form.get('estado').value);
    const estado = this.form.get('estado').value.sigla || this.form.get('estado').value;

    if (this.isFuncionario) {
      const sub = this.userService.updateEndereco({ cep, endereco, numero, complemento, estado, bairro, cidade }, id)
        .subscribe(response => {
          if (this.isModal) {
            this.fechar(true);
          } else {
            this.toastService.presentToast({
              titulo: 'Sucesso',
              detalhe: 'Operação bem sucedida!',
              duracao: ToastEnum.mediumDuration,
              gravidade: ToastPrimeSeverityEnum.SUCESSO
            });
            this.updatedEvent.emit(this.currentEndereco);
          }
        });
      this.subscriptions.add(sub);
    } else {
      const sub = this.lojaService.createOrUpdateEndereco(id, { cep, endereco, numero, complemento, estado, bairro, cidade })
        .subscribe(response => {
          if (this.isModal) {
            this.fechar(true);
          } else {
            this.toastService.presentToast({
              titulo: 'Sucesso',
              detalhe: 'Operação bem sucedida!',
              duracao: ToastEnum.mediumDuration,
              gravidade: ToastPrimeSeverityEnum.SUCESSO
            });
          }
        });
      this.subscriptions.add(sub);
    }
  }

  fechar(wasUpdated = false) {
    this.modal.dismiss(wasUpdated);
  }

  isInputError(inputName: string): boolean {
    const resp =
      this.form.controls[inputName].dirty &&
      this.form.controls[inputName].errors;

    if (resp) {
      return true;
    }
    return false;
  }

  disableCreateBtn(): boolean {
    const situacao = !this.form.valid;

    return situacao;
  }

}
