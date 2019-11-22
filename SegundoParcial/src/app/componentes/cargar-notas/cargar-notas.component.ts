import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { isUndefined } from 'util';

@Component({
  selector: 'app-cargar-notas',
  templateUrl: './cargar-notas.component.html',
  styleUrls: ['./cargar-notas.component.css']
})
export class CargarNotasComponent implements OnInit {

  @Output() cerrarCargarNotas: EventEmitter<any> = new EventEmitter<any>();
  @Input() materias: Array<any> = new Array<any>();
  @Input() inscripciones: Array<any> = new Array<any>();
  public nombre:string;
  public alumno: string;
  public notaAl:number;


  constructor(private fireStore: AngularFirestore)
  {

  }

  ngOnInit() {
  }

  crear()
  {
    let materia;
    let ok:boolean = this.validar();

    if(ok)
    {
      this.materias.forEach(mat =>
        {
          if(mat.nombre == this.nombre)
          {
            materia = mat;
          }
        });

      this.fireStore.collection("inscripciones").doc(this.nombre + this.alumno).set({
        nombre: this.nombre,
        cuatrimestre: materia.cuatrimestre,
        alumno: this.alumno,
        nota: this.notaAl
      }).catch(function(error)
      {
        alert("Error al registrarse");
      });

      this.cerrarCargarNotas.emit(false);
    }

  }

  validar()
  {
    let retorno: boolean = true;

    document.getElementById("mat").classList.remove("error");
    document.getElementById("al").classList.remove("error");
    document.getElementById("nota").classList.remove("error");

    document.getElementById("mat").classList.add("ok");
    document.getElementById("al").classList.add("ok");
    document.getElementById("nota").classList.add("ok");

    if(this.notaAl < 1 || this.notaAl > 10 || isUndefined(this.notaAl))
    {
      document.getElementById("nota").classList.add("error");
      retorno = false;
    }

    if(isUndefined(this.nombre))
    {
      document.getElementById("mat").classList.add("error");
      retorno = false;
    }

    if(isUndefined(this.alumno))
    {
      document.getElementById("al").classList.add("error");
      retorno = false;
    }

    return retorno;
  }

}
