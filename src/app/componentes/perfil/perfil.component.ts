import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  user;
  foto1 = "../../../assets/imagenes/usuarioPorDefecto.png";
  foto2 = "../../../assets/imagenes/usuarioPorDefecto.png";

  constructor(private context: AngularFireDatabase, private auth: AuthService, private storage: AngularFireStorage, private location: Location) { }

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.TraerUser();
    }, error => console.log(error));
  }


  Cerrar() {
    this.location.back();
  }

  TraerUser() {
    this.auth.GetCurrentUser().then(response => {
      let user = this.listadoUsuarios.filter(u => u.id == response.uid);
      this.user = user[0];
      this.storage.ref(this.user.foto1).getDownloadURL().subscribe((data: any) => {
        this.foto1 = data;
      });

      this.storage.ref(this.user.foto2).getDownloadURL().subscribe((data: any) => {
        this.foto2 = data;
      });

    });
  }


}
