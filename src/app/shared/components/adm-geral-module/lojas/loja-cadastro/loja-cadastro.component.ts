
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EstoqueMode } from './../../../../../shared/constants/estoque.constant';
import { LojaService } from './../../../../../shared/services/loja/loja.service';
import { RequestEstoqueCreationDto } from './../../../../interfaces/produtos/produto.dto';

@Component({
  selector: 'app-loja-cadastro',
  templateUrl: './loja-cadastro.component.html',
  styleUrls: ['./loja-cadastro.component.scss'],
})
export class LojaCadastroComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup;
  isLoaded = false;

  steps: MenuItem[];
  stepIndex = 0;

  createdlojaId = '';
  wasCreated = false;

  showQuestionDialog = false;
  questionTitle = '';
  questionDescription = '';

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private lojaService: LojaService,
    private modal: ModalController,

  ) {

    this.form = this.formBuilder.group({
      nome: ['teste', [Validators.required]],
      descricao: ['teste', [Validators.required,]],
      codigo: ['010', [Validators.required,]],
      estoque_mode: [EstoqueMode.NOTHING, [Validators.required,]],
    });
  }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.steps = [
      {
        label: 'Informações',
      },
      {
        label: 'Endereço',
      },
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  create() {
    const estoque_mode = this.form.get('estoque_mode').value;

    if (estoque_mode == EstoqueMode.SPECIFIED && this.stepIndex == 0) {
      this.stepIndex = 1;
      return;
    }

    const nome = this.form.get('nome').value;
    const descricao = this.form.get('descricao').value;
    const codigo = this.form.get('codigo').value;

    const sub = this.lojaService.create({ nome, descricao, codigo, estoque_mode, })
      .subscribe(response => {
        this.createdlojaId = response.id;
        this.wasCreated = true;
        this.stepIndex = 2;
      });

    this.subscriptions.add(sub);
  }

  listenProdutosSelection(event) {
    const nome = this.form.get('nome').value;
    const descricao = this.form.get('descricao').value;
    const codigo = this.form.get('codigo').value;
    const estoque_mode = this.form.get('estoque_mode').value;
    const produtos = event;

    const sub = this.lojaService.create({ nome, descricao, codigo, estoque_mode, produtos })
      .subscribe(response => {
        this.createdlojaId = response.id;
        this.wasCreated = true;
        this.stepIndex = 2;
      });

    this.subscriptions.add(sub);
  }

  listenEndereco(event) {
    this.fechar(this.wasCreated);
  }

  getGenerate() {
    return EstoqueMode.GENERATE;
  }
  getNothing() {
    return EstoqueMode.NOTHING;
  }
  getSpecified() {
    return EstoqueMode.SPECIFIED;
  }

  detailGenerate() {
    this.questionTitle = 'Geração automática';
    this.questionDescription = `Com esta opção selecionada, o sistema criará estoque ZERADO de todos os produtos existentes, na nova loja`;
    this.showQuestionDialog = true;
  }
  detailNothing() {
    this.questionTitle = 'Não criar estoques';
    this.questionDescription = `Com esta opção selecionada, o sistema ira criar apenas a loja, sem qualquer estoque`;
    this.showQuestionDialog = true;
  }
  detailSpecified() {
    this.questionTitle = 'Especficiar produtos';
    this.questionDescription = `Com esta opção selecionada, você selecionará na tela seguinte, todos os produtos e a quantidade em estoque que deseja que o sistema crie junto com a criação da loja`;
    this.showQuestionDialog = true;
  }

  fechar(wasCreated = false) {
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
