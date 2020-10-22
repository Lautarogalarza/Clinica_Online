import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../../servicios/auth.service";
import { Subscription } from "rxjs";

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


  @Output() emitRegister: EventEmitter<any> = new EventEmitter();


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit() { }

  ValidarAdmin(user) {

    if (user.email == "admin@admin.com" ||
      user.email == "paciente@paciente.com" ||
      user.email == "profesional@profesional.com") {
      this.router.navigate(["/home"]);
    }
  }

  
  CargarMensaje(mensaje: string) {

    this.mensaje = mensaje;

    setTimeout(() => {
      this.mensaje = null;
    }, 4000);

  }

  Login() {
    this.authService.Login(this.correo, this.contrasenia).then((response: any) => {
      this.ValidarAdmin(response.user);
      if (response.user.emailVerified) {

        this.router.navigate(["/home"]);
      }
      else {
        this.CargarMensaje("Falta verificar correo electronico");
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
