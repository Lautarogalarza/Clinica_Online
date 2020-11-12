import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home-profesional',
  templateUrl: './home-profesional.component.html',
  styleUrls: ['./home-profesional.component.scss']
})
export class HomeProfesionalComponent implements OnInit {

  habilitadoCargarHoras: boolean = false;
  habilitadoCargarTurnos: boolean = false;
  habilitadoCargarAtender: boolean = false;
  habilitadoCargarHistorial: boolean = false;

  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  user;

  constructor(private context: AngularFireDatabase, private auth: AuthService, private route: Router) { }

  ngOnInit(): void {

  }

  CargarHistorial() {
    this.habilitadoCargarHistorial = true;
    this.habilitadoCargarHoras = false;
    this.habilitadoCargarTurnos = false;
    this.habilitadoCargarAtender = false;
  }

  CargarHoras() {


    this.habilitadoCargarHoras = true;
    this.habilitadoCargarTurnos = false;
    this.habilitadoCargarAtender = false;

  }

  CargarTurnos() {
    this.habilitadoCargarTurnos = true;
    this.habilitadoCargarHoras = false;
    this.habilitadoCargarAtender = false;
  }

  CargarAtender() {

    this.habilitadoCargarAtender = true;
    this.habilitadoCargarTurnos = false;
    this.habilitadoCargarHoras = false;
  }

  CancelarTurnos(boolean) {
    this.habilitadoCargarTurnos = boolean;
  }

  CancelarHoras(boolean) {
    this.habilitadoCargarHoras = boolean;
  }

  CancelarAtender(boolean) {
    this.habilitadoCargarAtender = boolean;
  }

  CancelarAtenderHistorial(boolean){
    this.habilitadoCargarHistorial = boolean;
  }


}
