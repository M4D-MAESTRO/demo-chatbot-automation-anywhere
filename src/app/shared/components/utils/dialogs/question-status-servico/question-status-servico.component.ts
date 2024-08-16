
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-status-servico',
  templateUrl: './question-status-servico.component.html',
  styleUrls: ['./question-status-servico.component.scss'],
})
export class QuestionStatusServicoComponent implements OnInit {

  @Input()
  showDialog = false;

  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter();


  constructor(
  ) { }

  ngOnInit() {
  }

  close(){
    this.showDialog = false;
    this.closeEvent.emit(this.showDialog);
  }

}
