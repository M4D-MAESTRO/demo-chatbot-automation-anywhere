import { LojaService } from './../../../../services/loja/loja.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { Device } from '@capacitor/device';
import { Dropdown } from 'primeng/dropdown';
import { Subscription } from 'rxjs';

import { LojaDto } from '../../../../interfaces/lojas/loja.dto';
import { PatrimonioDto } from '../../../../../shared/interfaces/patrimonios/patrimonio.dto';
import { PatrimonioService } from '../../../../../shared/services/patrimonio/patrimonio.service';
import { PageableDto } from './../../../../interfaces/others/pageable.dto';
import { PageOrder } from './../../../../constants/page.constant';
import { StatusPatrimonio } from './../../../../constants/status.constant';

@Component({
  selector: 'app-patrimonio-detail',
  templateUrl: './patrimonio-detail.component.html',
  styleUrls: ['./patrimonio-detail.component.scss'],
})
export class PatrimonioDetailComponent implements OnInit, OnDestroy {

  @Input()
  patrimonio: PatrimonioDto;

  form: UntypedFormGroup;
  lojas: PageableDto<LojaDto>;
  selectedloja: string = undefined;
  currentlojasPage = 1;
  searchedloja = '';

  sortStatus = StatusPatrimonio;

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private patrimonioService: PatrimonioService,
    private lojaService: LojaService,
    private modal: ModalController,
  ) {

  }

  ngOnInit() {
    this.loadlojas();
    const { nome, descricao, valor_patrimonio, id_fisico, loja, status_patrimonio
    } = this.patrimonio;

    this.form = this.formBuilder.group({
      nome: [nome, [Validators.required]],
      descricao: [descricao, [Validators.required]],
      valor_patrimonio: [valor_patrimonio, [Validators.required,]],
      status_patrimonio: [status_patrimonio, [Validators.required,]],
      loja_id: [loja.id || undefined, [Validators.required,]],
      id_fisico: [id_fisico ? true : false],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  loadlojas(page = 1, dropdown?: Dropdown) {
    const sub = this.lojaService.list(
      { searchedLoja: this.searchedloja },
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

  async update() {
    const { id } = this.patrimonio;
    const nome = this.form.get('nome').value;
    const descricao = this.form.get('descricao').value;
    const valor_patrimonio = Number(this.form.get('valor_patrimonio').value);
    const id_fisico = this.form.get('id_fisico').value;
    const loja_id = this.form.get('loja_id').value;
    const status_patrimonio = this.form.get('status_patrimonio').value;

    let idOfThisPlataform = undefined;
    if (id_fisico) {
      idOfThisPlataform = (await Device.getId()).identifier;
    }

    const sub = this.patrimonioService.update(
      id,
      { nome, descricao, valor_patrimonio, id_fisico: idOfThisPlataform, loja_id, status_patrimonio }
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

  disableUpdateBtn(): boolean {
    const situacao = !this.form.valid;

    return situacao;
  }

}
