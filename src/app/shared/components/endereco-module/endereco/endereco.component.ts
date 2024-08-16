import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Estados } from '../../../../shared/constants/estado.constant';
import { UserService } from '../../../../shared/services/user/user.service';
import { LojaService } from '../../../services/loja/loja.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})
export class EnderecoComponent implements OnInit, OnDestroy {

  @Input()
  idOf: string;

  @Input()
  isFuncionario: boolean;

  @Input()
  isModal: boolean = false;

  @Output()
  createdEvent: EventEmitter<any> = new EventEmitter();

  form: UntypedFormGroup;

  listEstados = Estados;

  private subscriptions = new Subscription();


  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly userService: UserService,
    private readonly lojaService: LojaService,
    private readonly modal: ModalController,

  ) {

    this.form = this.formBuilder.group({
      cep: [, [Validators.required]],
      endereco: [, [Validators.required]],
      numero: [, [Validators.required,]],
      complemento: [, [Validators.required,]],
      bairro: [, [Validators.required,]],
      cidade: [, [Validators.required,]],
      estado: [, [Validators.required,]],
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  create() {
    const cep = this.form.get('cep').value;
    const endereco = this.form.get('endereco').value;
    const numero = this.form.get('numero').value;
    const complemento = this.form.get('complemento').value;
    const bairro = this.form.get('bairro').value;
    const cidade = this.form.get('cidade').value;
    const estado = this.form.get('estado').value;

    if (this.isFuncionario) {
      const sub = this.userService.createEndereco({ cep, endereco, numero, complemento, estado, bairro, cidade }, this.idOf)
        .subscribe(response => {
          if (this.isModal) {
            this.fechar(true);
          } else {
            this.createdEvent.emit({
              created: true,
            });
          }
        });
      this.subscriptions.add(sub);
    } else {
      const sub = this.lojaService.createOrUpdateEndereco(this.idOf, { cep, endereco, numero, complemento, estado, bairro, cidade })
        .subscribe(response => {
          if (this.isModal) {
            this.fechar(true);
          } else {
            this.createdEvent.emit({
              created: true,
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
