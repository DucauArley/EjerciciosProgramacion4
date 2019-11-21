import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { AlumnoMat } from './../../clases/alumno-mat';

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
          this.mats.push(mat);//Materias que da el profesor
        }
      });

    this.inscripciones.forEach(ins =>
      {
        this.mats.forEach(mat =>
          {
            if(mat.nombre == ins.nombre)
            {
              let alumno: AlumnoMat = new AlumnoMat(ins.alumno, "alumno", mat.nombre);
              this.info.push(alumno)//Aca tendria que agregar los datos de la materia tambien, por lo menos el nombre
            }

          });
      });
  }

}
