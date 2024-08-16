import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PocPage } from './poc.page';

const routes: Routes = [
  {
    path: '',
    component: PocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PocPageRoutingModule {}
