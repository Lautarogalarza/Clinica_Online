import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profesional-por-apellido',
  templateUrl: './profesional-por-apellido.component.html',
  styleUrls: ['./profesional-por-apellido.component.scss']
})
export class ProfesionalPorApellidoComponent implements OnInit {

  @Input() listaProfesionales: any;
  @Output() emitProfesional: EventEmitter<any> = new EventEmitter();
  constructor() {

  }

  ngOnInit(): void {

  }

  EnviarRegistro(prof) {
    this.emitProfesional.emit(prof);
   // console.log(prof);
  }

}
