import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-alumnos-materia',
  templateUrl: './alumnos-materia.component.html',
  styleUrls: ['./alumnos-materia.component.css']
})
export class AlumnosMateriaComponent implements OnInit {

  @Output() cerrarListaAlumn: EventEmitter<any> = new EventEmitter<any>();
  @Input() materias: Array<any> = new Array<any>();
  @Input() inscripciones: Array<any> = new Array<any>();
  public mats: Array<any> = new Array<any>();
  public info: Array<any> = new Array<any>();

  constructor() { }

  ngOnInit()
  {
    let email:string = firebase.auth().currentUser.email;

    this.materias.forEach(mat =>
      {
        if(mat.profesor == email)
        {
          this.mats.push(mat);
        }
      });

    this.inscripciones.forEach(ins =>
      {
        if(true)
        {

        }
      });
  }

}
