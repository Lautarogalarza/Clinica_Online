import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioBDService {



  constructor(private context: AngularFireDatabase, private authService: AuthService) { }


  RegistrarUser(usuario) {

    this.authService.GetCurrentUser().then((response: any) => {

      this.context.list('usuarios').set(response.uid,
        {
          correo: usuario.correo,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          id: response.uid,
          foto1: usuario.foto1,
          foto2: usuario.foto2,
          perfil: "paciente"
        });


    });

    this.authService.LogOutCurrentUser();
  }


  RegistrarAdmin(usuario) {

    this.authService.GetCurrentUser().then((response: any) => {

      this.context.list('usuarios').set(response.uid,
        {
          correo: usuario.correo,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          id: response.uid,
          perfil: "admin"
        });


    });


  }


  CargarEspecialidades(profesional) {

    console.log(profesional);

    this.authService.GetCurrentUser().then((response: any) => {

      profesional.especialidades.forEach(especialidad => {

        this.context.list('especialidades').set(especialidad,
          [{
            correo: profesional.correo,
            nombre: profesional.nombre,
            apellido: profesional.apellido,
            id: response.uid,
            foto1: profesional.foto1,
            foto2: profesional.foto2,
            habilitado: false,
            especialidades: profesional.especialidades,
            perfil: "profesional"
          }]);


      });



    });
  }



  CargarHoras(horas) {

    this.authService.GetCurrentUser().then((response: any) => {

      this.context.list('usuarios').update(response.uid,
        {
          horas: horas
        });
    });
  }


  RegistrarProfesional(profesional) {

    this.authService.GetCurrentUser().then((response: any) => {
      this.context.list('usuarios').set(response.uid,
        {
          correo: profesional.correo,
          nombre: profesional.nombre,
          apellido: profesional.apellido,
          id: response.uid,
          foto1: profesional.foto1,
          foto2: profesional.foto2,
          habilitado: false,
          especialidades: profesional.especialidades,
          perfil: "profesional"
        });

    });

    this.authService.LogOutCurrentUser();
  }


}
