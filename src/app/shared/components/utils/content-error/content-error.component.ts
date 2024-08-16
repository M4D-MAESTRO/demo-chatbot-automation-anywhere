import { Router } from '@angular/router';
import { ErrorContentDto } from './../../../interfaces/errors/error-content.dto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-error',
  templateUrl: './content-error.component.html',
  styleUrls: ['./content-error.component.scss'],
})
export class ContentErrorComponent implements OnInit {

  @Input()
  erroCode: number = 404;

  contentError: ErrorContentDto;

  constructor(
    private readonly router: Router,
    ) { }

  ngOnInit() {

    if(this.erroCode >= 500){
      this.define500();
      return;
    }

    if(this.erroCode == 403){
      this.define403();
      return;
    }

    this.define404();
   }

  define403() {
    this.contentError = {
      title: `Ops! Você não tem a chave secreta para abrir esta porta!`,
      message: `Parece que você tentou entrar em uma área restrita. Talvez você precise de um perfil diferente ou autorização adicional para acessar este lugar secreto.`,
      code: 403,
    }
  }

  define404() {
    this.contentError = {
      title: `Perdido no sistema: Conteúdo Não Encontrado!`,
      message: `Parece que você seguiu um coelho branco que nos levou para um buraco no sistema. O conteúdo que você está procurando não foi encontrado.`,
      code: 404,
    }
  }


  define500() {
    this.contentError = {
      title: `Falha na Matrix!`,
      message: `Parece que algo mais sério afetou nossa matrix. Recomenda-se entrar em contato com o administrador de T.I. Tire um print completo dessa tela e envie para eles.`,
      code: 500,
    }
  }

  getErrorImg(){
    return `assets/imgs/erros/${this.contentError.code}.png`;
  }

  goHome(){
    this.router.navigateByUrl('home');
  }

}
