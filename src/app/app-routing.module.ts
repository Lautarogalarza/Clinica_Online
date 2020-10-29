import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './componentes/admin/admin-panel/admin-panel.component';
import { LoginContenedorComponent } from './componentes/login-contenedor/login-contenedor.component';
import { NoExisteComponent } from './componentes/no-existe/no-existe.component';
import { HomePacienteComponent } from './componentes/paciente/home-paciente/home-paciente.component';
import { HomeProfesionalComponent } from './componentes/profesional/home-profesional/home-profesional.component';
import { AuthRutasGuard } from './guards/auth-rutas.guard';


const MiRuteo = [
  { path: '', component: LoginContenedorComponent },
  { path: 'login', component: LoginContenedorComponent },
  { path: 'profesional', component: HomeProfesionalComponent, canActivate: [AuthRutasGuard] },
  { path: 'paciente', component: HomePacienteComponent, canActivate: [AuthRutasGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthRutasGuard] },
  { path: '**', component: NoExisteComponent }];


@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
