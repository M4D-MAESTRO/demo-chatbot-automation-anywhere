import { Subscription } from 'rxjs';
import { NotaDto } from './../../../interfaces/notas/nota.dto';
import { NotasService } from './../../../services/notas/notas.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-versao-notas',
  templateUrl: './versao-notas.component.html',
  styleUrls: ['./versao-notas.component.scss'],
})
export class VersaoNotasComponent implements OnInit, OnDestroy {

  notas: NotaDto[] = [];
  private subscriptions = new Subscription();

  constructor(
    private readonly notasService: NotasService,
  ) { }

  ngOnInit() {
    this.loadNotas();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadNotas() {
    const sub = this.notasService.list()
      .subscribe(data => {
        this.notas = data;
        console.log(this.notas.length);
      });

    this.subscriptions.add(sub);

  }

}
