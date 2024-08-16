import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracaoTiPage } from './administracao-ti.page';

const routes: Routes = [
  {
    path: '',
    component: AdministracaoTiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracaoTiPageRoutingModule {}
