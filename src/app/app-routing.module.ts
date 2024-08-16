/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { Role } from './shared/constants/role.constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'poc',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/password-reset/password-reset.module').then(m => m.PasswordResetPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    // canLoad: [AuthGuardGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule),
    canLoad: [AuthGuardGuard],
  },
  {
    path: 'administracao-recurso',
    loadChildren: () => import('./pages/administracao-recurso/administracao-recurso.module').then(m => m.AdministracaoRecursoPageModule),
    canLoad: [AuthGuardGuard],
  },
  {
    path: 'administracao-geral',
    loadChildren: () => import('./pages/administracao-geral/administracao-geral.module').then(m => m.AdministracaoGeralPageModule),
    canLoad: [AuthGuardGuard],
  },
  {
    path: 'administracao-ti',
    loadChildren: () => import('./pages/administracao-ti/administracao-ti.module').then(m => m.AdministracaoTiPageModule),
    canLoad: [AuthGuardGuard],
  },
  {
    path: 'sobre',
    loadChildren: () => import('./pages/sobre/sobre.module').then( m => m.SobrePageModule),
   // canLoad: [AuthGuardGuard],
  },
  {
    path: 'poc',
    loadChildren: () => import('./pages/poc/poc.module').then( m => m.PocPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
