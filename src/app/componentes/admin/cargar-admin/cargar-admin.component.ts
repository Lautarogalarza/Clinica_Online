import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/clases/admin';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioBDService } from 'src/app/servicios/usuario-bd.service';

@Component({
  selector: 'app-cargar-admin',
  templateUrl: './cargar-admin.component.html',
  styleUrls: ['./cargar-admin.component.scss']
})
export class CargarAdminComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  correo: string;
  contrasenia: string;
  mensaje: string;

  constructor(private context: AngularFireDatabase, private authService: AuthService, private userService: UsuarioBDService) { }

  ngOnInit(): void {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
      this.listadoUsuarios = this.listadoUsuarios.filter(p => p.perfil == "profesional" && p.habilitado == false);
    }, error => console.log(error));

  }


  Register() {
    if ((this.contrasenia == null || this.contrasenia == "") || (this.correo == null || this.correo == "")) {

      this.CargarMensaje("Faltan Datos");
    }
    else {
      this.authService.Register(this.correo, this.contrasenia).then(response => {
        this.Cancelar();
        let admin = new Admin(this.correo);
        this.userService.RegistrarAdmin(admin);
      }).catch(error => { this.CargarMensaje(error); });

    }
  }

  CargarMensaje(mensaje: string) {

    this.mensaje = mensaje;

    setTimeout(() => {
      this.mensaje = null;
    }, 4000);

  }

  Cancelar() {

    this.emitCancelar.emit(false);
  }


}
