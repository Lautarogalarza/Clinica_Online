import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../../servicios/auth.service";
import { Observable, Subscription } from "rxjs";
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  correo = "";
  contrasenia = "";
  mensaje: string;

  usuarios: Observable<any[]>;
  listadoUsuarios = [];
  flag:boolean=true;


  @Output() emitRegister: EventEmitter<any> = new EventEmitter();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private context: AngularFireDatabase
  ) {

    this.authService.LogOutCurrentUser();

  }

  ngOnInit() {
    this.usuarios = this.context.list('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.listadoUsuarios = usuarios;
    }, error => console.log(error));
  }

  ValidarAdmin(usuario) {
    let userAdmin = this.listadoUsuarios.filter(u => u.id == usuario.uid);
    if (userAdmin[0].perfil == "admin") {
      this.router.navigate(["/admin"]);
      this.flag=false;
    }
    else if (usuario.email == "profesional@profesional.com") {

      this.router.navigate(["/profesional"]);
      this.flag=false;
    }
    else if (usuario.email == "paciente@paciente.com") {
      this.router.navigate(["/paciente"]);
      this.flag=false;
    }

  }



  CargarMensaje(mensaje: string) {

    this.mensaje = mensaje;

    setTimeout(() => {
      this.mensaje = null;
    }, 4000);

  }

  ValidarUser(usuario) {

    let user = this.listadoUsuarios.filter(u => u.id == usuario.user.uid);

    if (user[0].perfil == "profesional") {
      if (user[0].habilitado == false) {
        this.router.navigate(["/noHabilitado"]);
      }
      else {

        this.router.navigate(["/profesional"]);
      }
    } else {
      this.router.navigate(["/paciente"]);
    }

  }

  Login() {
    this.authService.Login(this.correo, this.contrasenia).then((response: any) => {
      this.ValidarAdmin(response.user);
      if (response.user.emailVerified) {
        this.ValidarUser(response);
      }
      else {
        if (this.flag) {
          this.CargarMensaje("Falta verificar correo electronico");
          this.flag=true;
          
        }
      }
    }).catch(error => { this.CargarMensaje(error); });
  }

  Cargar(usuario) {

    switch (usuario) {
      case "admin":

        this.correo = "admin@admin.com";
        this.contrasenia = "123456";

        break;
      case "profesional":

        this.correo = "profesional@profesional.com";
        this.contrasenia = "123456";

        break;
      case "paciente":

        this.correo = "paciente@paciente.com";
        this.contrasenia = "123456";

        break;

      default:
        break;
    }

  }

  EnviarRegistro() {

    this.emitRegister.emit(true);
  }


}
