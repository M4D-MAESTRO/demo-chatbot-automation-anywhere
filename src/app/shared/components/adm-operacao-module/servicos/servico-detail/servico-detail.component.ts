import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ServicosService } from './../../../../services/servico/servicos.service';
import { ServicosDto } from './../../../../interfaces/servicos/servicoes.dto';

@Component({
  selector: 'app-servico-detail',
  templateUrl: './servico-detail.component.html',
  styleUrls: ['./servico-detail.component.scss'],
})
export class ServicoDetailComponent implements OnInit, OnDestroy {

  @Input()
  servico: ServicosDto;
  form: UntypedFormGroup;
  wasCreated = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly servicosService: ServicosService,
    private readonly modal: ModalController,
  ) {

  }

  ngOnInit() {
    console.log(this.servico);
    const { nome, descricao, custo_servico, preco_servico, is_domicilio, is_remoto } = this.servico;
    this.form = this.formBuilder.group({
      nome: [nome, [Validators.required]],
      descricao: [descricao, [Validators.required,]],
      custo_servico: [custo_servico, [Validators.required,]],
      preco_servico: [preco_servico, [Validators.required,]],
      is_remoto: [is_remoto, [Validators.required,]],
      is_domicilio: [is_domicilio, [Validators.required,]],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  atualizar() {
    const { id } = this.servico;
    const nome = this.form.get('nome').value;
    const descricao = this.form.get('descricao').value;
    const custo_servico = this.form.get('custo_servico').value;
    const preco_servico = this.form.get('preco_servico').value;
    const is_remoto = this.form.get('is_remoto').value;
    const is_domicilio = this.form.get('is_domicilio').value;

    const sub = this.servicosService.update(id, { nome, descricao, custo_servico, is_domicilio, is_remoto, preco_servico })
      .subscribe(data => {
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

  disableAtualizarBtn(): boolean {
    const situacao = !this.form.valid;

    return situacao;
  }

}
