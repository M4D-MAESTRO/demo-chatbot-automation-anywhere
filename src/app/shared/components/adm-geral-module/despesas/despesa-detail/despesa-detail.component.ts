import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DespesaDto } from 'src/app/shared/interfaces/despesas/despesa.dto';
import { DespesaService } from 'src/app/shared/services/despesa/despesa.service';

@Component({
  selector: 'app-despesa-detail',
  templateUrl: './despesa-detail.component.html',
  styleUrls: ['./despesa-detail.component.scss'],
})
export class DespesaDetailComponent implements OnInit, OnDestroy {

  @Input()
  despesa: DespesaDto;

  form: UntypedFormGroup;
  isLoaded = false;

  createdDespesaId = '';
  wasCreated = false;


  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly despesaService: DespesaService,
    private readonly modal: ModalController,
  ) {
  }

  ngOnInit() {
    const { nome, descricao } = this.despesa;

    this.form = this.formBuilder.group({
      nome: [nome, [Validators.required]],
      descricao: [descricao, [Validators.required,]],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  update() {
    const { id } = this.despesa;

    const nome = this.form.get('nome').value;
    const descricao = this.form.get('descricao').value;

    const sub = this.despesaService.update({ nome, descricao }, id)
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

  disableUpdateBtn(): boolean {
    const situacao = !this.form.valid;

    return situacao;
  }

}
