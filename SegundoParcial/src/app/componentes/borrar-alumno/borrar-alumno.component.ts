import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { isUndefined } from 'util';


@Component({
  selector: 'app-borrar-alumno',
  templateUrl: './borrar-alumno.component.html',
  styleUrls: ['./borrar-alumno.component.css']
})
export class BorrarAlumnoComponent implements OnInit {

  @Output() cerrarBorrarAl: EventEmitter<any> = new EventEmitter<any>();
  @Input() usuarios: Array<any> = new Array<any>();
  public alumnos: Array<any> = new Array<any>();
  public alumno:string;

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit()
  {
    this.usuarios.forEach(usr=>
    {
      if(usr.tipo == "Alumno")
      {
        this.alumnos.push(usr);
      }
    })
  }

  borrar()
  {
    let ok:boolean = this.validar();

    if(ok)
    {
      this.fireStore.collection("usuarios").doc(this.alumno).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

    this.fireStore.collection("alumnosBorrados").doc(this.alumno).set({
      email: this.alumno,
      tipo: "Alumno"
    }).catch(function(error)
    {
      alert("Error al registrarse");
    });


    this.cerrarBorrarAl.emit(false);
    }
  }

  validar()
  {
    let retorno: boolean = true;

    document.getElementById("mat").classList.remove("error");

    document.getElementById("mat").classList.add("ok");

    if(isUndefined(this.alumno))
    {
      document.getElementById("mat").classList.add("error");
      retorno = false;
    }

    return retorno;
  }

}
