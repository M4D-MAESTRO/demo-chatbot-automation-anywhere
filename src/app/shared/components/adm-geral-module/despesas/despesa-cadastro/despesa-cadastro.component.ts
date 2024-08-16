import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DespesaService } from 'src/app/shared/services/despesa/despesa.service';

@Component({
  selector: 'app-despesa-cadastro',
  templateUrl: './despesa-cadastro.component.html',
  styleUrls: ['./despesa-cadastro.component.scss'],
})
export class DespesaCadastroComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup;
  isLoaded = false;

  createdDespesaId = '';
  wasCreated = false;

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private despesaService: DespesaService,
    private modal: ModalController,

  ) {
    this.form = this.formBuilder.group({
      nome: [, [Validators.required]],
      descricao: [, [Validators.required,]],
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

    const sub = this.despesaService.create({ nome, descricao })
      .subscribe(response => {
        this.fechar(true);
      });

    this.subscriptions.add(sub);
  }
  fechar(wasCreated = false) {
    this.modal.dismiss(wasCreated);
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
