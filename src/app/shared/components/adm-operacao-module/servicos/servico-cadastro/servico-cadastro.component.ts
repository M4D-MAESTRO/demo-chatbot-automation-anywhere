
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ServicosService } from './../../../../services/servico/servicos.service';

@Component({
  selector: 'app-servico-cadastro',
  templateUrl: './servico-cadastro.component.html',
  styleUrls: ['./servico-cadastro.component.scss'],
})
export class ServicoCadastroComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup;
  isLoaded = false;

  createdServicoId = '';
  wasCreated = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly servicosService: ServicosService,
    private readonly modal: ModalController,
  ) {

    this.form = this.formBuilder.group({
      nome: [, [Validators.required]],
      descricao: [, [Validators.required,]],
      custo_servico: [, [Validators.required,]],
      preco_servico: [, [Validators.required,]],
      is_remoto: [false, [Validators.required,]],
      is_domicilio: [false, [Validators.required,]],
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  create() {
    const nome = this.form.get('nome').value;
    const descricao = this.form.get('descricao').value;
    const custo_servico = this.form.get('custo_servico').value;
    const preco_servico = this.form.get('preco_servico').value;
    const is_remoto = this.form.get('is_remoto').value;
    const is_domicilio = this.form.get('is_domicilio').value;

    const sub = this.servicosService.create({ nome, descricao, custo_servico, is_domicilio, is_remoto, preco_servico })
      .subscribe(data => {
        this.createdServicoId = data.id;
        this.wasCreated = true;
        this.fechar();
      });

    this.subscriptions.add(sub);
  }

  fechar() {
    this.modal.dismiss(this.wasCreated);
  }

  isInputError(inputName: string): boolean {
    const resp =
      !this.form.controls[inputName].untouched &&
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