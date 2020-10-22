import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginContenedorComponent } from './componentes/login-contenedor/login-contenedor.component';
import { NoExisteComponent } from './componentes/no-existe/no-existe.component';
import { AuthRutasGuard } from './guards/auth-rutas.guard';


const MiRuteo = [
  { path: '', component: LoginContenedorComponent },
  { path: 'login', component: LoginContenedorComponent },
  { path: 'error', component: NoExisteComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthRutasGuard] }];


@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
