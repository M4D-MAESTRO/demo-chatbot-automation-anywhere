

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Device } from '@capacitor/device';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';

import { PatrimonioService } from '../../../../../shared/services/patrimonio/patrimonio.service';
import { LojaService } from '../../../../services/loja/loja.service';
import { LojaDto } from '../../../../interfaces/lojas/loja.dto';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { PageOrder } from './../../../../constants/page.constant';

@Component({
  selector: 'app-patrimonio-cadastro',
  templateUrl: './patrimonio-cadastro.component.html',
  styleUrls: ['./patrimonio-cadastro.component.scss'],
})
export class PatrimonioCadastroComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup;
  lojas: PageableDto<LojaDto>;
  selectedLoja = undefined;
  currentlojasPage = 1;
  searchedLoja = '';

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private patrimonioService: PatrimonioService,
    private lojaService: LojaService,
    private modal: ModalController,
  ) {
    this.form = this.formBuilder.group({
      nome: [, [Validators.required]],
      descricao: [, [Validators.required]],
      valor_patrimonio: [, [Validators.required,]],
      loja_id: [this.selectedLoja, [Validators.required,]],
      id_fisico: [],
    });
  }

  ngOnInit() {
    // this.loadlojas();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  loadlojas(page = 1, dropdown?: Dropdown) {
    const sub = this.lojaService.list(
      { searchedLoja: this.searchedLoja },
      { order: PageOrder.ASC, page, take: 10 })
      .subscribe(data => {
        this.lojas = data;
        if (dropdown) {
          dropdown.show();
        }
      });

    this.subscriptions.add(sub);
  }
  searchloja(dropdown?: Dropdown) {
    this.loadlojas(1, dropdown);
  }
  paginarlojas(event, dropdown?: Dropdown) {
    const { first, rows } = event;
    const page = Number((Number(first) / Number(rows)) + 1);
    if (page != this.currentlojasPage) {
      this.currentlojasPage = page;
      this.loadlojas(page, dropdown);
    }
  }

  async create() {
    const nome = this.form.get('nome').value;
    const descricao = this.form.get('descricao').value;
    const valor_patrimonio = this.form.get('valor_patrimonio').value;
    const id_fisico = this.form.get('id_fisico').value;
    const loja_id = this.form.get('loja_id').value;

    let idOfThisPlataform = undefined;
    if (id_fisico) {
      idOfThisPlataform = (await Device.getId()).identifier;
    }

    const sub = this.patrimonioService.create(
      { nome, descricao, valor_patrimonio, id_fisico: idOfThisPlataform, loja_id }
    )
      .subscribe(response => {
        this.fechar(true, { loja_id });
      });

    this.subscriptions.add(sub);
  }

  fechar(wasCreated = false, data?: any) {
    this.modal.dismiss(wasCreated, data);
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
