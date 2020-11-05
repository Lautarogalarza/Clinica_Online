import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.scss']
})
export class PedirTurnoComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  @Input() profesional;
  fechaTurno: Date;
  horaTurno;
  dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
  diasFiltrados = [];
  auxProf;
  diaTurno;
  especialidadTurno;
  mensaje;
  constructor(private context: AngularFireDatabase, private afAuth: AuthService) {

  }

  ngOnInit(): void {
    this.CambiarUser();
  }



  CambiarDias(event) {
    this.diaTurno = event.target.value;
  }

  CambiarEspecialidad(event) {
    this.especialidadTurno = event.target.value;
  }

  ValidarDiaDelTurno(): boolean {
    let fechaTurnoAux = new Date(this.fechaTurno);
    let diaAux = this.dias[fechaTurnoAux.getDay()];
    if (diaAux == this.diaTurno) {
      return true;
    }
    else {
      this.CargarMensaje("El dia pedido y el dia del turno no coinciden");
    }
  }

  CargarTurno() {
    if (this.horaTurno != undefined && this.fechaTurno != undefined && this.diaTurno != undefined && this.especialidadTurno != undefined) {
      if (this.diaTurno != "sabado") {
        if (this.ValidarHora()) {
          if (this.ValidarDiaDelTurno()) {
            this.CrearTurno();
          }
        }
      }
      else {
        if (this.ValidarHorasSabados()) {
          if (this.ValidarDiaDelTurno()) {
            this.CrearTurno();
          }
        }
      }
    }
    else {
      this.CargarMensaje("Por favor cargue todos los datos");
    }
  }





  CrearTurno() {
    let turno;
    let KeyTurno = 'Turno' + Math.random().toString(26).substr(2, 9);
    this.afAuth.GetCurrentUser().then(response => {
      turno = new Turno(
        "PENDIENTE",
        this.fechaTurno.toString(),
        this.horaTurno,
        this.especialidadTurno,
        "",
        "",
        "",
        "",
        this.profesional.id,
        response.email,
        response.uid,
        this.profesional.correo,
        KeyTurno,
        ""
      );
      console.log(turno);
      this.context.list('turnos').set(KeyTurno, turno);
      this.CargarMensaje("Turno pedido!!");
    });

  }



  ValidarHora(): boolean {
    let horaTurnoAux = new Date("1/1/2011 " + this.horaTurno);
    let fechaDesde = new Date("1/1/2011 " + this.profesional.horas.desde);
    let fechaHasta = new Date("1/1/2011 " + this.profesional.horas.hasta);

    if (horaTurnoAux.getHours() < 8) {
      this.CargarMensaje("la clinica empieza a atender a la 8");
    }
    else if (horaTurnoAux.getHours() >= 19) {
      this.CargarMensaje("la clinica deja de atender a las 19");
    }
    else {
      if (horaTurnoAux.getHours() < 19 || horaTurnoAux.getHours() == 19 && horaTurnoAux.getMinutes() == 0) {
        if (horaTurnoAux.getHours() < fechaDesde.getHours()) {
          //if (horaTurnoAux.getMinutes() >= fechaDesde.getMinutes()) {
          this.CargarMensaje("El profesional no empezo a atender 1");
          return false;
          //}  
        }
        if (horaTurnoAux.getHours() == fechaDesde.getHours()) {
          if (horaTurnoAux.getMinutes() < fechaDesde.getMinutes()) {
            this.CargarMensaje("El profesional no empezo a atender 2");
            return false;
          }
          else {
            return true;
          }
        }
        else if (horaTurnoAux.getHours() > fechaHasta.getHours()) {
          this.CargarMensaje("El profesional dejo de atender 1");
          return false;
        }
        else if (horaTurnoAux.getHours() == fechaHasta.getHours()) {
          if (horaTurnoAux.getMinutes() > fechaHasta.getMinutes()) {
            this.CargarMensaje("El profesional dejo de atender 2");
            return false;
          }
          else {
            return true;
          }
        }
        else {
          return true;
        }
      }
      else {
        this.CargarMensaje("la clinica deja de atender a las 19");
      }
    }
  }

  CargarMensaje(mensaje: string) {
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = null;
    }, 4000);

  }


  ValidarHorasSabados(): boolean {
    let horaTurnoAux = new Date("1/1/2011 " + this.horaTurno);
    let fechaDesde = new Date("1/1/2011 " + this.profesional.horas.desdeSabado);
    let fechaHasta = new Date("1/1/2011 " + this.profesional.horas.hastaSabado);

    if (fechaDesde.getHours() < 8) {

      this.CargarMensaje("la clinica empieza a atender a la 8")

    }
    else if (fechaDesde.getHours() >= 14) {
      this.CargarMensaje("la clinica deja de atender a las 14")
    }
    else {
      if (horaTurnoAux.getHours() < 14 || horaTurnoAux.getHours() == 19 && horaTurnoAux.getMinutes() == 0) {
        if (horaTurnoAux.getHours() < fechaDesde.getHours()) {
          if (horaTurnoAux.getMinutes() <= fechaDesde.getMinutes()) {
            this.CargarMensaje("El profesional no empezo a atender");
          }
        }
        if (horaTurnoAux.getHours() == fechaDesde.getHours()) {
          if (horaTurnoAux.getMinutes() < fechaDesde.getMinutes()) {
            this.CargarMensaje("El profesional no empezo a atender");
          }
        }
        else if (horaTurnoAux.getHours() > fechaHasta.getHours()) {
          if (horaTurnoAux.getMinutes() >= fechaHasta.getMinutes()) {
            this.CargarMensaje("El profesional dejo de atender");
          }
        }
        else if (horaTurnoAux.getHours() == fechaHasta.getHours()) {
          if (horaTurnoAux.getMinutes() > fechaHasta.getMinutes()) {
            this.CargarMensaje("El profesional dejo de atender");
          }
        }
        else {
          return true;
        }
      }
      else {
        this.CargarMensaje("la clinica deja de atender a las 14 los sabados")
      }
    }
  }


  CambiarUser() {
    if (this.auxProf != this.profesional.correo) {
      console.log(this.auxProf);
      this.ValidarDias();
    }
  }

  ValidarDias() {

    if (this.profesional.horas.dias["lunes"]) {
      this.diasFiltrados.push("lunes");
    }
    if (this.profesional.horas.dias["martes"]) {
      this.diasFiltrados.push("martes");
    }
    if (this.profesional.horas.dias["miercoles"]) {
      this.diasFiltrados.push("miercoles");
    }
    if (this.profesional.horas.dias["jueves"]) {
      this.diasFiltrados.push("jueves");
    }
    if (this.profesional.horas.dias["viernes"]) {
      this.diasFiltrados.push("viernes");
    }
    if (this.profesional.horas.dias["sabado"]) {
      this.diasFiltrados.push("sabado");
    }

    this.auxProf = this.profesional.correo;

    let min = new Date().toISOString().split('T')[0];
    let aux = new Date();
    aux.setDate(aux.getDate() + 15);
    let max = aux.toISOString().split('T')[0];

    setTimeout(() => {
      document.querySelector("#fechaDesde").setAttribute('min', min);
      document.querySelector("#fechaDesde").setAttribute('max', max);
    }, 1000);

  }

  Cancelar() {
    this.emitCancelar.emit(false);
  }

}
