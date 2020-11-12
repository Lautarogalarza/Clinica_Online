import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './componentes/register/register.component';
import { LoginContenedorComponent } from './componentes/login-contenedor/login-contenedor.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthService } from "./servicios/auth.service";
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoExisteComponent } from './componentes/no-existe/no-existe.component';
import { HomePacienteComponent } from './componentes/paciente/home-paciente/home-paciente.component';
import { HomeProfesionalComponent } from './componentes/profesional/home-profesional/home-profesional.component';
import { PedirTurnoComponent } from './componentes/paciente/pedir-turno/pedir-turno.component';
import { ProfesionalPorApellidoComponent } from './componentes/paciente/profesional-por-apellido/profesional-por-apellido.component';
import { ProfesionalPorDiaComponent } from './componentes/paciente/profesional-por-dia/profesional-por-dia.component';
import { ProfesionalPorEspecialidadComponent } from './componentes/paciente/profesional-por-especialidad/profesional-por-especialidad.component';
import { AdminPanelComponent } from './componentes/admin/admin-panel/admin-panel.component';
import { CargarAdminComponent } from './componentes/admin/cargar-admin/cargar-admin.component';
import { HabilitarProfesionalComponent } from './componentes/admin/habilitar-profesional/habilitar-profesional.component';
import { AgregarEspecialidadComponent } from './componentes/admin/agregar-especialidad/agregar-especialidad.component';
import { GestionarHorasComponent } from './componentes/profesional/gestionar-horas/gestionar-horas.component';
import { GestionarTurnosComponent } from './componentes/profesional/gestionar-turnos/gestionar-turnos.component';
import { AtenderPacienteComponent } from './componentes/profesional/atender-paciente/atender-paciente.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProfesionalNoHabilitadoComponent } from './componentes/profesional/profesional-no-habilitado/profesional-no-habilitado.component';
import { DatePipe } from '@angular/common';
import { CancelarTurnoComponent } from './componentes/paciente/cancelar-turno/cancelar-turno.component';
import { RechazarTurnoComponent } from './componentes/paciente/rechazar-turno/rechazar-turno.component';
import { VerTurnoAceptadoComponent } from './componentes/paciente/ver-turno-aceptado/ver-turno-aceptado.component';
import { VerTurnoCanceladoRechazadoComponent } from './componentes/paciente/ver-turno-cancelado-rechazado/ver-turno-cancelado-rechazado.component';
import { EncuestaReseniaComponent } from './componentes/profesional/encuesta-resenia/encuesta-resenia.component';
import { HistoriaClinicaCargarComponent } from './componentes/profesional/historia-clinica-cargar/historia-clinica-cargar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginContenedorComponent,
    RegisterComponent,
    LoginComponent,
    RegisterComponent,
    CabeceraComponent,
    NoExisteComponent,
    HomePacienteComponent,
    HomeProfesionalComponent,
    PedirTurnoComponent,
    ProfesionalPorApellidoComponent,
    ProfesionalPorDiaComponent,
    ProfesionalPorEspecialidadComponent,
    AdminPanelComponent,
    CargarAdminComponent,
    HabilitarProfesionalComponent,
    AgregarEspecialidadComponent,
    GestionarHorasComponent,
    GestionarTurnosComponent,
    AtenderPacienteComponent,
    PerfilComponent,
    ProfesionalNoHabilitadoComponent,
    CancelarTurnoComponent,
    RechazarTurnoComponent,
    VerTurnoAceptadoComponent,
    VerTurnoCanceladoRechazadoComponent,
    EncuestaReseniaComponent,
    HistoriaClinicaCargarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AngularFireStorageModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
