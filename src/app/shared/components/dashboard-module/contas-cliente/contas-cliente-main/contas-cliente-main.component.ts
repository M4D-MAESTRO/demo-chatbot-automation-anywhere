

import { Component, Input, OnInit } from '@angular/core';

import { UserDto } from './../../../../interfaces/users/user.dto';
import { PageOrder } from './../../../../constants/page.constant';
import { ContasClienteService } from './../../../../services/adm-financeira/contas/contas-cliente/contas-cliente.service';

@Component({
  selector: 'app-contas-cliente-main',
  templateUrl: './contas-cliente-main.component.html',
  styleUrls: ['./contas-cliente-main.component.scss'],
})
export class ContasClienteMainComponent implements OnInit {

  @Input()
  user: UserDto

  @Input()
  date: Date

  isLoaded = false;

  constructor(
    private readonly contaClienteService: ContasClienteService,
  ) { }

  ngOnInit() {
    if (!this.date) {
      this.date = new Date();
    }
  }

  loadConta(page = 1) {
 /*   const sub = this.contaClienteService.list({  }, { order: PageOrder.DESC, page, take: 5 })
      .subscribe(response => {
        this.users = response;
        this.isLoaded = true;
      });
    this.subscriptions.add(sub);*/
  }

}
