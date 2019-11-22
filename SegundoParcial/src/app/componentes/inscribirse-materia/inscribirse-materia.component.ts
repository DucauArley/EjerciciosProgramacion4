import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { isUndefined } from 'util';

@Component({
  selector: 'app-inscribirse-materia',
  templateUrl: './inscribirse-materia.component.html',
  styleUrls: ['./inscribirse-materia.component.css']
})
export class InscribirseMateriaComponent implements OnInit {

  @Output() inscripcionMateria: EventEmitter<any> = new EventEmitter<any>();
  @Input() materias: Array<any> = new Array<any>();
  @Input() inscripciones: Array<any> = new Array<any>();
  public nombre:string;
  public cuatrimestre: string = "Primero";
  public email:string = firebase.auth().currentUser.email;


  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
  }

  crear()
  {
    let materia;

    let ok = this.validar();

    if(ok)
    {
      this.fireStore.collection("inscripciones").doc(this.nombre + this.email).set({
        nombre: this.nombre,
        cuatrimestre: this.cuatrimestre,
        alumno: this.email,
        nota: 0
      }).catch(function(error)
      {
        alert("Error al registrarse");
      });

      this.materias.forEach(mat =>
        {
          if(mat.nombre == this.nombre)
          {
            materia = mat;
          }
        });

      this.fireStore.collection("materias").doc(this.nombre).set({
        nombre: this.nombre,
        cuatrimestre: this.cuatrimestre,
        cupos: materia.cupos - 1,
        profesor: materia.profesor
      }).catch(function(error)
      {
        alert("Error al cargar");
      })

      console.log(this.nombre);
      console.log(this.cuatrimestre);

      this.inscripcionMateria.emit(false);
    }
  }

  cerrar()
  {
    this.inscripcionMateria.emit(false);
  }

  validar()
  {
    let retorno: boolean = true;
    let okCuat:boolean = true

    document.getElementById("mat").classList.remove("error");
    document.getElementById("cuat").classList.remove("error");

    document.getElementById("mat").classList.add("ok");
    document.getElementById("cuat").classList.add("ok");

    this.materias.forEach(mat =>
    {
      if(mat.nombre == this.nombre && mat.cuatrimestre != this.cuatrimestre)
      {
        okCuat = false;
      }
    });


    this.inscripciones.forEach(ins=>
    {
      if(ins.nombre == this.nombre && ins.cuatrimestre == this.cuatrimestre && ins.alumno == this.email)
      {
        alert("Ya te inscribiste en esa materia");
        retorno = false;
      }
    });

    if(!okCuat)
    {
      document.getElementById("cuat").classList.add("error");
      retorno = false;
    }

    if(isUndefined(this.nombre))
    {
      document.getElementById("mat").classList.add("error");
      retorno = false;
    }

    return retorno;
  }

}
