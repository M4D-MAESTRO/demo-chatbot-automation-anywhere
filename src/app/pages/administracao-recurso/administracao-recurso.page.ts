import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administracao-recurso',
  templateUrl: './administracao-recurso.page.html',
  styleUrls: ['./administracao-recurso.page.scss'],
})
export class AdministracaoRecursoPage implements OnInit {

  currentTab = 'funcionario';

  constructor(
  ) { }

  ngOnInit() {
  }

  changeTab(event) {
    this.currentTab = event.detail.value;
  }


}
