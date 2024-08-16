import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administracao-geral',
  templateUrl: './administracao-geral.page.html',
  styleUrls: ['./administracao-geral.page.scss'],
})
export class AdministracaoGeralPage implements OnInit {

  currentTab = 'loja';

  constructor(
  ) { }

  ngOnInit() {
  }

  changeTab(event) {
    this.currentTab = event.detail.value;
  }

}
