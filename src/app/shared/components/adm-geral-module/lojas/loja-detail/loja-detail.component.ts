import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LojaDto } from 'src/app/shared/interfaces/lojas/loja.dto';
import { LojaService } from 'src/app/shared/services/loja/loja.service';

@Component({
  selector: 'app-loja-detail',
  templateUrl: './loja-detail.component.html',
  styleUrls: ['./loja-detail.component.scss'],
})
export class LojaDetailComponent implements OnInit, OnDestroy {

  @Input()
  loja: LojaDto;

  form: UntypedFormGroup;
  isLoaded = false;

  wasCreated = false;

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private lojaService: LojaService,
    private modal: ModalController,

  ) {
  }

  ionViewWillEnter() {
  }

  ngOnInit() {

    const { nome, descricao, codigo } = this.loja;

    this.form = this.formBuilder.group({
      nome: [nome, [Validators.required]],
      descricao: [descricao, [Validators.required,]],
      codigo: [codigo, [Validators.required,]],
    });

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  update() {
    const { id } = this.loja;

    const nome = this.form.get('nome').value;
    const descricao = this.form.get('descricao').value;
    const codigo = this.form.get('codigo').value;

    const sub = this.lojaService.update({ nome, descricao, codigo, }, id)
      .subscribe(response => {
        this.fechar(true)
      });

    this.subscriptions.add(sub);
  }

  fechar(wasCreated = false) {
    this.modal.dismiss(wasCreated);
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

  disableUpdateBtn(): boolean {
    const situacao = !this.form.valid;

    return situacao;
  }

}

// TODO - Criar o UPDATE