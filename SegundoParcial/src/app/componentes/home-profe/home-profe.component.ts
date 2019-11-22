import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-home-profe',
  templateUrl: './home-profe.component.html',
  styleUrls: ['./home-profe.component.css']
})
export class HomeProfeComponent implements OnInit {

  public materias: Array<any>;
  public inscripciones: Array<any>;
  public materiasCargo:boolean = false;
  public alumnosMateria:boolean = false;
  public notasAlumnos:boolean = false;

  constructor(private fireStore: AngularFirestore)
  {
    this.materias = new Array<any>();
    this.inscripciones = new Array<any>();
  }

  ngOnInit()
  {
    let materias = this.fireStore.collection("materias").valueChanges();

    materias.forEach(materia=>
      {
        materia.forEach(item=>
          {
            this.materias.push(item);
          })
      });

    let inscripciones = this.fireStore.collection("inscripciones").valueChanges();

    inscripciones.forEach(ins=>
      {
        ins.forEach(item=>
          {
            this.inscripciones.push(item);
          })
      });
  }

}
