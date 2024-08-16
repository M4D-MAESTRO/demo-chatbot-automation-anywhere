import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImovelCadastroModule } from './imovel-cadastro/imovel-cadastro.module';
import { ImovelDetailModule } from './imovel-detail/imovel-detail.module';
import { ImovelMainModule } from './imovel-main/imovel-main.module';
import { ImovelFichaModule } from './imovel-ficha/imovel-ficha.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImovelCadastroModule,
    ImovelDetailModule,
    ImovelMainModule,
    ImovelFichaModule,
  ],
  exports: [
    ImovelCadastroModule,
    ImovelDetailModule,
    ImovelMainModule,
    ImovelFichaModule,
  ]
})
export class ImovelModuleModule { }
