import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioBDService } from 'src/app/servicios/usuario-bd.service';

@Component({
  selector: 'app-gestionar-horas',
  templateUrl: './gestionar-horas.component.html',
  styleUrls: ['./gestionar-horas.component.scss']
})
export class GestionarHorasComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  constructor(private context: AngularFireDatabase, private authService: AuthService, private userService: UsuarioBDService) { }

  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  profesional: any;
  sabadoCargado: boolean = false;

  desde;
  hasta;
  desdeSabado;
  hastaSabado;
  mensaje: string;

  dias = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false
  };

  duracion = 30;

  CargarMensaje(mensaje: string) {

    this.mensaje = mensaje;

    setTimeout(() => {
      this.mensaje = null;
    }, 4000);

  }


  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.listadoUsuarios = this.listadoUsuarios.filter(p => p.perfil == "profesional" && p.habilitado == true);
      this.TraerProfesional();
    }, error => console.log(error));
  }

  TraerProfesional() {
    this.authService.GetCurrentUser().then(response => {
      this.profesional = this.listadoUsuarios.filter(p => p.id == response.uid)
    });
  }

  Cancelar() {

    this.emitCancelar.emit(false);
  }

  ValidarDuracion(): boolean {

    if (this.duracion < 30) {
      this.CargarMensaje("los turnos tienen una duracion minima de 30 minutos");
      return false;
    }
    else if (this.duracion > 60) {
      this.CargarMensaje("los turnos tienen una duracion maxima de 60 minutos");
      return false;
    }

    return true;

  }


  ValidarHoras() {

    var fechaDesde = new Date("1/1/2011 " + this.desde);
    var fechaHasta = new Date("1/1/2011 " + this.hasta);

    if (fechaDesde.getHours() < 8) {

      this.CargarMensaje("la clinica empieza a atender a la 8")

    }
    else if (fechaDesde.getHours() >= 19) {
      this.CargarMensaje("la clinica deja de atender a las 19")
    }
    else {


      if (fechaHasta.getHours() < 19 || fechaHasta.getHours() == 19 && fechaHasta.getMinutes() == 0) {


        if (((fechaHasta.getTime() / 60000) - (fechaDesde.getTime() / 60000)) < this.duracion) {
          this.CargarMensaje("La franja de horario es muy corta");
        }
        else if (((fechaHasta.getTime() / 60000) - (fechaDesde.getTime() / 60000)) >= this.duracion) {
          return true;
        }



      }

      else {
        this.CargarMensaje("la clinica deja de atender a las 19")
      }
    }


  }

  ValidarHorasSabados() {
    var fechaDesde = new Date("1/1/2011 " + this.desdeSabado);
    var fechaHasta = new Date("1/1/2011 " + this.hastaSabado);

    if (fechaDesde.getHours() < 8) {

      this.CargarMensaje("la clinica empieza a atender a la 8")

    }
    else if (fechaDesde.getHours() >= 14) {
      this.CargarMensaje("la clinica deja de atender a las 14")
    }
    else {

      if (fechaHasta.getHours() < 14 || fechaHasta.getHours() == 14 && fechaHasta.getMinutes() == 0) {


        if (((fechaHasta.getTime() / 60000) - (fechaDesde.getTime() / 60000)) < this.duracion) {
          this.CargarMensaje("La franja de horario es muy corta");
        }
        else if (((fechaHasta.getTime() / 60000) - (fechaDesde.getTime() / 60000)) >= this.duracion) {
          return true;
        }

      }

      else {
        this.CargarMensaje("la clinica deja de atender a las 14")
      }
    }


  }


  CargarHoras() {

    console.log(this.dias);

    if (this.ValidarDuracion()) {

      let horas;

      if (this.sabadoCargado) {

        if (this.ValidarHorasSabados() && this.ValidarHoras()) {

          horas = {
            desde: this.desde,
            hasta: this.hasta,
            desdeSabado: this.desdeSabado,
            hastaSabado: this.hastaSabado,
            duracion: this.duracion,
            dias: this.dias
          }
          this.userService.CargarHoras(horas);
          this.Cancelar();
        }
      }
      else {

        if (this.ValidarHoras()) {

          horas = {
            desde: this.desde,
            hasta: this.hasta,
            duracion: this.duracion,
            dias: this.dias
          }
          this.userService.CargarHoras(horas);
          this.Cancelar();
        }
      }


    }


  }

  CargarSabado() {

    if (this.sabadoCargado == false) {
      this.sabadoCargado = true;

    } else {
      this.sabadoCargado = false;
    }

  }






}
