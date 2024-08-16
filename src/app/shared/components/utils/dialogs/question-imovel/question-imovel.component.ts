import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { ImovelService } from '../../../../services/imovel/imovel.service';
import { ImovelDto } from '../../../../interfaces/imoveis/imovel.dto';

@Component({
  selector: 'app-question-imovel',
  templateUrl: './question-imovel.component.html',
  styleUrls: ['./question-imovel.component.scss'],
})
export class QuestionImovelComponent implements OnInit, OnDestroy {

  @Input()
  showDialog = false;

  @Input()
  selectedImovel: ImovelDto;

  @Input()
  imovel_id: string;

  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter();

  private subscriptions = new Subscription();

  constructor(
    private readonly imovelService: ImovelService,
  ) { }

  ngOnInit() {
    if (this.selectedImovel) {
      this.showDialog = true;
    } else {
      this.loadImovel();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  loadImovel() {
    if (!this.selectedImovel && !this.imovel_id) {
      this.close();
      return;
    }

    const sub = this.imovelService.findById(this.imovel_id)
      .subscribe(data => {
        this.selectedImovel = data;
        this.showDialog = true;
      });
    this.subscriptions.add(sub);
  }

  close() {
    this.showDialog = false;

    this.closeEvent.emit(this.showDialog);
  }
}
