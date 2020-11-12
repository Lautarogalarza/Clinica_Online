import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.scss']
})
export class PedirTurnoComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  @Input() profesionales;
  @Input() especialidadTurno;
  fechaTurno: Date;
  horaTurno;
  dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  horarioSemanal = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
  horarioSabados = ["08:00","09:00","10:00","11:00","12:00","13:00"];
  diasFiltrados = [];
  auxProf;
  diaTurno;
  mensaje;
  turno;
  correcto = false;
  listaTurnos=[];
  listaTurnosDB=[];
  mostrarTurnos:boolean=false;
  profesional;
  constructor(private context: AngularFireDatabase, private afAuth: AuthService, private datePipe : DatePipe,private auth: AuthService) {
  }

  ngOnInit(): void {
      this.TraerTurnos();  
 
   
  }

  TraerTurnos() {
    this.context.list('turnos').valueChanges().subscribe(turnos => {
      this.listaTurnosDB = turnos;
      this.auth.GetCurrentUser().then(usuario => {
        this.listaTurnosDB = this.listaTurnosDB.filter(t => t.idPaciente == usuario.uid)
      })
    });
  
  }

  BuscarTurno(profesional) {
    this.profesional=profesional;
    this.mostrarTurnos=true;
    this.CargarDias(profesional);

    let hoy = new Date();
    let contador=0;
    let turno;
    this.listaTurnos=[];
    
    while (contador<15) {
      turno=null;
      if (hoy.getDay()!=0 && this.ValidarDias(hoy.getDay())) {   
         let nuevaFecha = this.datePipe.transform(hoy, "yyyy-MM-dd");       
         for (const horario of this.horarioSemanal) {
           if (hoy.getDay()!=6) {
             if (profesional.horas.desde<=horario && profesional.horas.hasta>=horario) {            
               turno={
                 fecha:nuevaFecha,
                 dia:this.dias[hoy.getDay()-1],
                 hora:horario
               } 
               if (this.ValidarNuevoTurno(turno)) {
                 
                 this.listaTurnos.push(turno);
               }
             }                    
           }
           else{
            if (profesional.horas.desdeSabado<=horario && profesional.horas.hastaSabado>=horario) {            
              turno={
                fecha:nuevaFecha,
                dia:this.dias[hoy.getDay()-1],
                hora:horario
              } 
              if (this.ValidarNuevoTurno(turno)) {
                 
                this.listaTurnos.push(turno);
              }
            }     
           }
         }
         contador++;    
         hoy.setDate(hoy.getDate() + 1);     
      }
      else{
        contador++;    
        hoy.setDate(hoy.getDate() + 1);
      }
      
    }

  }

  ValidarNuevoTurno(turno):boolean{
    let resultado:boolean=true;
    for (const t of this.listaTurnosDB) {
      if (t.solicitudHora == turno.hora && t.solicitudFecha== turno.fecha) {
        resultado= false;
      } 
    }
    
    return resultado;

  }

  CrearTurno(nuevoTurno) {
    let turno;
    let KeyTurno = 'Turno' + Math.random().toString(26).substr(2, 9);
    this.afAuth.GetCurrentUser().then(response => {
      turno = new Turno(
        "PENDIENTE",
        nuevoTurno.fecha.toString(),
        nuevoTurno.hora.toString(),
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
      this.correcto = true;
    });
    this.BuscarTurno(this.profesional);
   this.Cancelar();
  }




  CargarMensaje(mensaje: string) {
    this.mensaje = mensaje;
    setTimeout(() => {
      this.mensaje = null;
      this.correcto = false;
    }, 2000);

  }

  Cancelar() {
    this.emitCancelar.emit(false);
    this.listaTurnos = null;
  }

  ValidarFechas(profesional) {

  }

  ValidarDias(dia):boolean{
    let resultado:boolean=false;
    for (const diaFiltrado of this.diasFiltrados) {
      if (dia==diaFiltrado) {
        resultado=true;
      }
    }

  return resultado;

  }


  CargarDias(profesional) {
    this.diasFiltrados = [];
    if (profesional.horas.dias["lunes"]) {
      this.diasFiltrados.push(1);
    }
    if (profesional.horas.dias["martes"]) {
      this.diasFiltrados.push(2);
    }
    if (profesional.horas.dias["miercoles"]) {
      this.diasFiltrados.push(3);
    }
    if (profesional.horas.dias["jueves"]) {
      this.diasFiltrados.push(4);
    }
    if (profesional.horas.dias["viernes"]) {
      this.diasFiltrados.push(5);
    }
    if (profesional.horas.dias["sabado"]) {
      this.diasFiltrados.push(6);
    }
    this.diasFiltrados.push(...this.diasFiltrados);

  }


}
