import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracaoGeralPage } from './administracao-geral.page';

const routes: Routes = [
  {
    path: '',
    component: AdministracaoGeralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracaoGeralPageRoutingModule {}
