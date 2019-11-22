import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  public usuarios: Array<any>;
  public materias: Array<any>;
  public inscripciones: Array<any>;
  public altaMateria:boolean = false;
  public listaUsuarios:boolean = false;
  public listaMaterias:boolean = false;
  public borrarAl:boolean = false;

  constructor(private fireStore: AngularFirestore, private router: Router)
  {
    this.usuarios = new Array<any>();
    this.materias = new Array<any>();
    this.inscripciones = new Array<any>();
  }

  ngOnInit()
  {
    let usuarios = this.fireStore.collection("usuarios").valueChanges();

    usuarios.forEach(usuario=>
      {
        usuario.forEach(item=>
          {
            this.usuarios.push(item);
          })
      })

    let materias = this.fireStore.collection("materias").valueChanges();

    materias.forEach(materia=>
      {
        materia.forEach(item=>
          {
            this.materias.push(item);
          })
      })

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
