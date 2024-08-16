import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  currentTab = 'geral';

  constructor(
  ) { }

  ngOnInit() {
  }

  changeTab(event) {
    this.currentTab = event.detail.value;
  }

}
