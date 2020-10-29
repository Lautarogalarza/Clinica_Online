import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profesional-por-apellido',
  templateUrl: './profesional-por-apellido.component.html',
  styleUrls: ['./profesional-por-apellido.component.scss']
})
export class ProfesionalPorApellidoComponent implements OnInit {

@Input() listaProfesionales: any;

  constructor() {
    
   }

  ngOnInit(): void {
   
  }

}
