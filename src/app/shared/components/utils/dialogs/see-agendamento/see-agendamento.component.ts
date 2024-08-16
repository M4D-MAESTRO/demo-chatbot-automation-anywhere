
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StatusServicoEnum } from './../../../../constants/status.constant';
import { PrestacaoServicoDto } from './../../../../interfaces/servicos/prestacao-servico.dto';

import { ExternalRedirect } from './../../../../utils/ExternalLink';

@Component({
  selector: 'app-see-agendamento',
  templateUrl: './see-agendamento.component.html',
  styleUrls: ['./see-agendamento.component.scss'],
})
export class SeeAgendamentoComponent implements OnInit {

  @Input()
  showDialog = false;

  @Input()
  selectedPrestacaoServico: PrestacaoServicoDto;

  @Input()
  title: string = 'Prestação de Serviço';

  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter();

  @Output()
  seeEnderecoEvent: EventEmitter<boolean> = new EventEmitter();

  @Output()
  updateAgendamentoEvent: EventEmitter<PrestacaoServicoDto> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.showDialog = false;
    this.closeEvent.emit(this.showDialog);
  }

  dialogSeeEndereco() {
    this.seeEnderecoEvent.emit(true);
    //this.close();
  }

  editPrestacao() {
    this.updateAgendamentoEvent.emit(this.selectedPrestacaoServico);
    this.close();
  }

  showUpdateButton() {
    if (!this.selectedPrestacaoServico) {
      return false;
    }
    const { status_servico } = this.selectedPrestacaoServico;
    if (status_servico == StatusServicoEnum.FINALIZADO || status_servico == StatusServicoEnum.CANCELADO) {
      return false;
    }

    return true;
  }

}
