import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-contenedor',
  templateUrl: './login-contenedor.component.html',
  styleUrls: ['./login-contenedor.component.css']
})
export class LoginContenedorComponent implements OnInit {

  visibleLogin:boolean=true;
  visibleRegister:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }


  CambiarVista(boolean){
      if (boolean==true) {

       this.visibleLogin=false;
       this.visibleRegister=true;
        
      } else {

        this.visibleLogin=true;
        this.visibleRegister=false;
        
      }
    
  }

}
