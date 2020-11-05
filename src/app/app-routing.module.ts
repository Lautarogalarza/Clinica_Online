import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './componentes/admin/admin-panel/admin-panel.component';
import { LoginContenedorComponent } from './componentes/login-contenedor/login-contenedor.component';
import { NoExisteComponent } from './componentes/no-existe/no-existe.component';
import { HomePacienteComponent } from './componentes/paciente/home-paciente/home-paciente.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { HomeProfesionalComponent } from './componentes/profesional/home-profesional/home-profesional.component';
import { ProfesionalNoHabilitadoComponent } from './componentes/profesional/profesional-no-habilitado/profesional-no-habilitado.component';
import { ReseniaEncuestaComponent } from './componentes/profesional/resenia-encuesta/resenia-encuesta.component';
import { AuthRutasGuard } from './guards/auth-rutas.guard';


const MiRuteo = [
  { path: '', component: LoginContenedorComponent, data: { animation: 'Login' } },
  { path: 'login', component: LoginContenedorComponent, },
  { path: 'profesional', component: HomeProfesionalComponent, canActivate: [AuthRutasGuard], data: { animation: 'Register' } },
  { path: 'paciente', component: HomePacienteComponent, canActivate: [AuthRutasGuard],data: { animation: 'Paciente' } },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthRutasGuard] },
  { path: 'perfilUsuario', component: PerfilComponent, canActivate: [AuthRutasGuard] },
  { path: 'noHabilitado', component: ProfesionalNoHabilitadoComponent, canActivate: [AuthRutasGuard] },
  { path: 'atencion', component: ReseniaEncuestaComponent, canActivate: [AuthRutasGuard] },
  { path: '**', component: NoExisteComponent }];


@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
