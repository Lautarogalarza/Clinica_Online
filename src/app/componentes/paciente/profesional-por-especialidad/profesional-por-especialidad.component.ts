import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profesional-por-especialidad',
  templateUrl: './profesional-por-especialidad.component.html',
  styleUrls: ['./profesional-por-especialidad.component.scss']
})
export class ProfesionalPorEspecialidadComponent implements OnInit {
  @Input() listaProfesionales: any;
  especialidades: any[] = [];
  listaAux: any[] = [];
  @Output() emitProfesional: EventEmitter<any> = new EventEmitter();
  @Output() emitEspecialidad: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.CargarEspecialidades();
    }, 1000);
  }

  CargarEspecialidades() {
    this.listaProfesionales.forEach(profesional => {
      profesional.especialidades.forEach(especialidad => {
        if (!this.especialidades.includes(especialidad)) {
          this.especialidades.push(especialidad);
        }
      });
    });
    // this.CargarProfesionales();
  }




  EnviarProfesional(esp) {
    let ProfesionalPorEspecialidad = [];

    this.listaProfesionales.forEach(profesional => {
      profesional.especialidades.forEach(especialidad => {
        if (especialidad == esp) {
          ProfesionalPorEspecialidad.push(profesional);
        }
      });
    });

    this.emitProfesional.emit(ProfesionalPorEspecialidad);
    this.emitEspecialidad.emit(esp);
  }





  /*CargarProfesionales() {
    console.log(this.especialidades);
    let aux = [];
    let flag: boolean = false;

    this.listaProfesionales.forEach(profesional => {
      this.especialidades.forEach(especialidad => {
        profesional.especialidades.forEach(especialidadProfesional => {
          if (especialidad == especialidadProfesional) {

            this.listaAux.push(profesional);
            flag = true;
          }
        });
        if (flag) {
          aux.push({
            especialidad: especialidad,
            profesional: this.listaAux
          }
          );
          flag = false;
        }
        this.listaAux = [];
      });
    });
    this.CargarProfesionalesConEspecialidades(aux)
  }

  CargarProfesionalesConEspecialidades(especialidadesProf) {

    especialidadesProf.forEach(element => {
      console.log(element);
    });

  }*/

}


