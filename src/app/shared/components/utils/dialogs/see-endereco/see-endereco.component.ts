
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExternalRedirect } from './../../../../utils/ExternalLink';
import { EnderecoDto } from './../../../../interfaces/enderecos/endereco.dto';

@Component({
  selector: 'app-see-endereco',
  templateUrl: './see-endereco.component.html',
  styleUrls: ['./see-endereco.component.scss'],
})
export class SeeEnderecoComponent implements OnInit {

  @Input()
  showDialog = false;

  @Input()
  endereco: EnderecoDto;

  @Input()
  title: string = 'Endereço';

  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter();

  @Output()
  returnEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {}


  dialogOpenMap() {
    const { bairro, cep, cidade, complemento, endereco, estado, numero } = this.endereco;
    //Exemplo: https://www.google.com.br/maps/place/R.+do+Amparo,+145+-+Cascadura,+Rio+de+Janeiro+-+RJ,+21381-340
    const url = `https://www.google.com.br/maps/place/${endereco},+${numero},+-+${bairro},+${cidade}+-+${estado},+${cep}`;
    ExternalRedirect.externalLinkHandle(url);
    this.close();
  }

  close(){
    this.showDialog = false;
    this.closeEvent.emit(this.showDialog);
  }

  dialogVoltar(){
    this.returnEvent.emit(true);
   // this.close();
  }

}
