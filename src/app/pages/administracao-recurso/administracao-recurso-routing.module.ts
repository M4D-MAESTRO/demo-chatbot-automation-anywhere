import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracaoRecursoPage } from './administracao-recurso.page';

const routes: Routes = [
  {
    path: '',
    component: AdministracaoRecursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracaoRecursoPageRoutingModule {}
