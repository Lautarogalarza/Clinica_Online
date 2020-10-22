import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from "../../servicios/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Profesional } from 'src/app/clases/profesional';
import { Paciente } from 'src/app/clases/paciente';
import { UsuarioBDService } from 'src/app/servicios/usuario-bd.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  correo: string;
  contraseia: string;
  nombre: string;
  apellido: string;
  mensaje: string;
  especialidades = [];
  especialidad: string;
  foto1: any;
  foto2: any;
  fotoCargada1: any;
  fotoCargada2: any;

  registroMensaje = "REGISTRO DE PACIENTE";
  mostrarProfesional = false;



  @Output() emitRegister: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService, private angularFireStorage: AngularFireStorage, private userService: UsuarioBDService) { }

  ngOnInit() {
  }

  Registrar() {

    if ((this.contraseia == null || this.contraseia == "")
      || (this.correo == null || this.correo == "")
      || (this.nombre == null || this.nombre == "")
      || (this.apellido == null || this.apellido == "")) {

      this.CargarMensaje("Faltan Datos");
    }
    else {

      if (this.registroMensaje == "REGISTRO DE PACIENTE") {

        this.authService.Register(this.correo, this.contraseia).then(response => {
          this.SubirFotos(response.user.uid);
          let paciente = new Paciente(this.nombre, this.correo, this.apellido, this.contraseia, this.fotoCargada1, this.fotoCargada2);
          this.userService.RegistrarUser(paciente);
          this.Limpiar();
          this.EnviarRegistro();

        }).catch(error => { this.CargarMensaje(error); });

      }
      else {

        this.authService.Register(this.correo, this.contraseia).then(response => {
          this.SubirFotos(response.user.uid);
          let profesional = new Profesional(this.nombre, this.correo, this.apellido, this.contraseia, this.fotoCargada1, this.fotoCargada2, this.especialidades);
          this.userService.RegistrarProfesional(profesional);
          this.Limpiar();
          this.EnviarRegistro();
        }).catch(error => { this.CargarMensaje(error); });

      }

    }
  }


  CargarMensaje(mensaje: string) {

    this.mensaje = mensaje;

    setTimeout(() => {
      this.mensaje = null;
    }, 4000);

  }


  Limpiar() {
    this.nombre = null;
    this.correo = null;
    this.apellido = null;
    this.contraseia = null;
    (<HTMLInputElement>document.getElementById("foto1")).value = "";
    (<HTMLInputElement>document.getElementById("foto2")).value = "";
    this.especialidades = null;
  }



  CambioFotos(e, numero) {
    if (numero == 1) {
      this.foto1 = e.target.files[0];
      console.log(this.foto1);
    } else {
      this.foto2 = e.target.files[0];
      console.log(this.foto2);
    }
  }

  SubirFotos(id: string) {
    if (this.foto1) {
      this.fotoCargada1 = `/usuarios/${id}/${1}`;
      this.angularFireStorage.upload(this.fotoCargada1, this.foto1);
    } else {
      this.fotoCargada1 = `/usuarios/default.png`;
    }
    if (this.foto2) {
      this.fotoCargada2 = `/usuarios/${id}/${2}`;
      this.angularFireStorage.upload(this.fotoCargada2, this.foto2);
    } else {
      this.fotoCargada2 = `/usuarios/default.png`;
    }
  }




  AgregarEspecialidades() {

    let auxEspecialidad = this.especialidades.filter(e => e == this.especialidad);

    auxEspecialidad.length == 0 ? this.especialidades.push(this.especialidad) : console.log("cargada");
    this.especialidad = null;

  }


  BorrarEspecialidades(especialidad: string) {
    let index = this.especialidades.indexOf(especialidad)
    this.especialidades.splice(index, 1)
  }


  CambioUsuario(event) {

    if (event.target.value == "Profesional") {
      this.registroMensaje = "REGISTRO DE PROFESIONAL"
      this.mostrarProfesional = true;

    } else {

      this.registroMensaje = "REGISTRO DE PACIENTE"
      this.mostrarProfesional = false;

    }

  }

  EnviarRegistro() {

    this.emitRegister.emit(false);
  }

}
