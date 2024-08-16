
import { ModalController } from '@ionic/angular';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { StatusServicoEnum } from './../../../../constants/status.constant';
import { PrestacaoServicoDto } from './../../../../interfaces/servicos/prestacao-servico.dto';
import { EnderecoDto } from './../../../../interfaces/enderecos/endereco.dto';
import { ExternalRedirect } from './../../../../utils/ExternalLink';
import { ToastMessageService } from './../../../../services/toast/toast-message.service';
import { PrestacaoServicosService } from './../../../../services/prestacao-servicos/prestacao-servicos.service';
import { LocalAgendamento } from './../../../../constants/agendamento.constant';
import { ToastEnum, ToastPrimeSeverityEnum } from './../../../../constants/toast.constant';

@Component({
  selector: 'app-prestacao-servico-detail',
  templateUrl: './prestacao-servico-detail.component.html',
  styleUrls: ['./prestacao-servico-detail.component.scss'],
})
export class PrestacaoServicoDetailComponent implements OnInit, OnDestroy {

  @Input()
  id: string;

  @Input()
  selectedPrestacaoServico: PrestacaoServicoDto;

  endereco: EnderecoDto;

  showDialog = true;
  showEnderecoDialog = false;
  title: string = 'Prestação de Serviço';

  private subscriptions = new Subscription();

  constructor(
    private readonly modal: ModalController,
    private readonly toastService: ToastMessageService,
    private readonly prestacaoServicosService: PrestacaoServicosService,
  ) { }

  ngOnInit() {
    if (this.id) {
      this.findById();
    } else if (this.selectedPrestacaoServico) {
      this.generateEndereco();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  findById() {
    const sub = this.prestacaoServicosService.findById(this.id)
      .subscribe({
        next: (data) => {
          this.selectedPrestacaoServico = data;
          this.generateEndereco();
        }
      });
    this.subscriptions.add(sub);
  }

  generateEndereco() {
    const { local, agendamento_servico, condominio } = this.selectedPrestacaoServico;
    if (local == LocalAgendamento.LOCAL || local == LocalAgendamento.EXTERNO) {
      const endereco = agendamento_servico?.endereco || condominio.endereco;
      this.endereco = endereco;
    }
  }

  close() {
    this.showDialog = false
    this.modal.dismiss();
  }

  dialogSeeEndereco() {
    if (!this.endereco) {
      this.toastService.presentToast({
        detalhe: `Sem endereço adicional cadastrado`,
        titulo: `Atenção`,
        duracao: ToastEnum.shortDuration,
        gravidade: ToastPrimeSeverityEnum.ATENCAO
      });
      return;
    }
    this.showEnderecoDialog = true;
  }
  closeEndereco() {
    this.showEnderecoDialog = false;
  }

  dialogOpenMap() {
    const { bairro, cep, cidade, complemento, endereco, estado, numero } = this.endereco;
    //Exemplo: https://www.google.com.br/maps/place/R.+do+Amparo,+145+-+Cascadura,+Rio+de+Janeiro+-+RJ,+21381-340
    const url = `https://www.google.com.br/maps/place/${endereco},+${numero},+-+${bairro},+${cidade}+-+${estado},+${cep}`;
    ExternalRedirect.externalLinkHandle(url);
  }


}
