import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-encuesta-resenia',
  templateUrl: './encuesta-resenia.component.html',
  styleUrls: ['./encuesta-resenia.component.scss']
})
export class EncuestaReseniaComponent implements OnInit {
  @Output() emitCancelar: EventEmitter<any> = new EventEmitter();
  habilitado: boolean = false;
  resenia: string = "";
  encuestaResultado = "Muy satisfactorio";
  @Input() turno;
  @Input() datosPaciente;
  usuario;

  constructor(private context: AngularFireDatabase, private afAuth: AuthService, private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  CancelarTurnoRechazado() {
    this.emitCancelar.emit(false);
  }
  OnItemChange(event) {
    this.encuestaResultado = event.target.value;
  }

  GuardarEncuesta() {

    this.afAuth.GetCurrentUser().then(response => {
      this.context.list("usuarios").valueChanges().subscribe((user) => {
        this.usuario = user;
        this.usuario = this.usuario.filter(u => u.id == response.uid);
        console.log(this.usuario[0].perfil);
        if (this.usuario[0].perfil == "paciente") {
          this.context.list('turnos').update(this.turno.idTurno, {
            encuestaPaciente: this.encuestaResultado,
            comentarioPaciente: this.resenia,
          });
          this.CancelarTurnoRechazado();
        } else {
          this.context.list('turnos').update(this.turno.idTurno, {
            estado: "ATENDIDO",
            encuestaProfesional: this.encuestaResultado,
            comentarioProfesional: this.resenia,
            datosPaciente: this.datosPaciente
          });
          this.CancelarTurnoRechazado();

          this.location.back()
        }
      });

    });

  }


  /*GuardarEncuesta() {

    if (this.ValidarUser()) {
     
      this.context.list('turnos').update(this.turno.idTurno, {
        encuestaPaciente: this.encuestaResultado,
        comentarioPaciente: this.resenia,
      });
      this.CancelarTurnoRechazado();
      
    } else {
      console.log("Soy un profesional")
      this.resenia;
      this.encuestaResultado;

      this.context.list('turnos').update(this.turno.idTurno, {
        estado: "ATENDIDO",
        encuestaProfesional: this.encuestaResultado,
        comentarioProfesional: this.resenia,
        datosPaciente: this.datosPaciente
      });
      this.CancelarTurnoRechazado();
      
      this.location.back()
      
    }

  }*/


}
