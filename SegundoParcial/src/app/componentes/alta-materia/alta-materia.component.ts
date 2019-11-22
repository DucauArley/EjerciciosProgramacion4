import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { isUndefined } from 'util';

@Component({
  selector: 'app-alta-materia',
  templateUrl: './alta-materia.component.html',
  styleUrls: ['./alta-materia.component.css']
})
export class AltaMateriaComponent implements OnInit {

  @Output() altaMateria: EventEmitter<any> = new EventEmitter<any>();
  @Input() usuarios: Array<any> = new Array<any>();
  @Input() materias: Array<any> = new Array<any>();
  public nombre: string;
  public cuatrimestre: string = "Primero";
  public cupos: number;
  public profesor: string;
  public imagen: any;

  constructor(private fireStore: AngularFirestore)
  {
  }

  ngOnInit()
  {
  }

  crear()
  {
    let ok = this.verificar();

    console.log(this.imagen);

    if(ok)
    {
      this.fireStore.collection("materias").doc(this.nombre).set({
        nombre: this.nombre,
        cuatrimestre: this.cuatrimestre,
        cupos: this.cupos,
        profesor: this.profesor,
        imagen: this.imagen
      }).catch(function(error)
      {
        alert("Error al cargar");
      })

      console.log(this.nombre);
      console.log(this.cuatrimestre);
      console.log(this.cupos);
      console.log(this.profesor);


      this.altaMateria.emit(false);
    }
  }

  cerrar()
  {
    this.altaMateria.emit(false);
  }

  verificar()
  {
    let retorno:boolean = true;
    let okMat:boolean = true;
    let okProf:boolean = false;
    document.getElementById("nomb").classList.remove("error");
    document.getElementById("cupos").classList.remove("error");
    document.getElementById("prof").classList.remove("error");
    document.getElementById("myFile").classList.remove("error");

    document.getElementById("nomb").classList.add("ok");
    document.getElementById("cupos").classList.add("ok");
    document.getElementById("prof").classList.add("ok");
    document.getElementById("myFile").classList.add("ok");


    this.materias.forEach(mat =>
    {
      if(mat.nombre == this.nombre)
      {
        okMat = false;
      }
    });

    if(okMat != true || isUndefined(this.nombre))
    {
      document.getElementById("nomb").classList.add("error");
      retorno = false;
    }

    if(this.cupos < 1 || this.cupos >50 || isUndefined(this.cupos))
    {
      document.getElementById("cupos").classList.add("error");
      retorno = false;
    }

    this.usuarios.forEach(user =>
    {
      if(user.email == this.profesor && user.tipo == "Profesor")
      {
        okProf = true;
      }
    });


    if(okProf == false)
    {
      document.getElementById("prof").classList.add("error");
      retorno = false;
    }

    if(isUndefined(this.materias))
    {
      document.getElementById("myFile").classList.add("error");
      retorno = false;
    }

    return retorno;
  }


}
