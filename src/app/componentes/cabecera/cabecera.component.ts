import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {



  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit(): void {


  }

  

  CerrarSesion() {
    this.auth.LogOutCurrentUser();
  }

  EnviarRuta(path) {
    this.route.navigate([path]);

  }

}
