import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
})
export class GenericDialogComponent implements OnInit {

  message = '';
  showDialog = true;

  constructor(
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    this.message = this.config.data;
    //this.config.footer = '<button type="button" (click)="close()">OK</button>';
  }

  close() {
    // Lógica a ser executada quando o botão for clicado
    this.ref.close(); // Feche o dialog se necessário
  }

}
