import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioBDService {

  constructor(private context: AngularFireDatabase, private authService: AuthService) { }


  RegistrarUser(usuario) {

    this.authService.GetCurrentUser().then((response: any) => {

      this.context.list('pacientes').set(response.uid,
        {
          correo: usuario.correo,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          id: response.uid,
          foto1: usuario.foto1,
          foto2: usuario.foto2
        });
    });

    this.authService.LogOutCurrentUser();
  }

  RegistrarProfesional(profesional) {

    this.authService.GetCurrentUser().then((response: any) => {
      this.context.list('profesionales').set(response.uid,
        {
          correo: profesional.correo,
          nombre: profesional.nombre,
          apellido: profesional.apellido,
          id: response.uid,
          foto1: profesional.foto1,
          foto2: profesional.foto2,
          habilitado: false,
          especialidades: profesional.especialidades
        });
    });

    this.authService.LogOutCurrentUser();
  }


}
