import { Estrella } from './../clases/estrella';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstrellaService {

  public estrellas: Array<any>;

  constructor(private fireStore: AngularFirestore){ }

  traerTodos()
  {
    this.estrellas = new Array<any>();

    let estre = this.fireStore.collection("estrellas").valueChanges();

    estre.forEach(est=>
      {
        est.forEach(item=>
          {
            this.estrellas.push(item);
          })
      });

      return this.estrellas;
  }

  altaEstrella(est:Estrella)
  {
    this.fireStore.collection("estrellas").doc(est.apellido).set({
      nombre: est.nombre,
      apellido: est.apellido,
      nacionalidad: est.nacionalidad,
      fechaNacimiento: est.fechaNacimiento
    }).catch(function(error)
    {
      alert("Error al cargar");
    });
  }

}
