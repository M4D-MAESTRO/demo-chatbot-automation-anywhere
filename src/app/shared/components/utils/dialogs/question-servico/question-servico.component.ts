
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { ServicosService } from './../../../../services/servico/servicos.service';
import { ServicosDto } from './../../../../interfaces/servicos/servicoes.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-servico',
  templateUrl: './question-servico.component.html',
  styleUrls: ['./question-servico.component.scss'],
})
export class QuestionServicoComponent implements OnInit, OnDestroy {

  @Input()
  showDialog = false;

  @Input()
  selectedServico: ServicosDto;

  @Input()
  servico_id: string;

  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter();

  private subscriptions = new Subscription();

  constructor(
    private readonly servicosService: ServicosService,
  ) { }

  ngOnInit() {
    if (this.selectedServico) {
      this.showDialog = true;
    } else {
      this.loadServico();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  loadServico() {
    if (!this.selectedServico && !this.servico_id) {
      this.close();
      return;
    }

    const sub = this.servicosService.findById(this.servico_id)
      .subscribe(data => {
        this.selectedServico = data;
        this.showDialog = true;
      });
      this.subscriptions.add(sub);
  }

  close() {
    this.showDialog = false;

    this.closeEvent.emit(this.showDialog);
  }
}
