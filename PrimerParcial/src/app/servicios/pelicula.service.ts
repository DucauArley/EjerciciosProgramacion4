import { Pelicula } from './../clases/pelicula';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  public peliculas: Array<any>;


  constructor(private fireStore: AngularFirestore) { }


  traerTodos()
  {
    this.peliculas = new Array<any>();

    let pelis = this.fireStore.collection("peliculas").valueChanges();

    pelis.forEach(peli=>
      {
        peli.forEach(item=>
          {
            this.peliculas.push(item);
          })
      });

      return this.peliculas;
  }

  altaPelicula(peli:Pelicula)
  {
    this.fireStore.collection("peliculas").doc(peli.nombre).set({
      id: peli.id,
      nombre: peli.nombre,
      tipo: peli.tipo,
      fechaEstreno: peli.fechaEstreno,
      cantidadPublico: peli.cantidadPublico,
      fotoPelicula: "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png",
      actorPrincipal: peli.actorPrincipal
    }).catch(function(error)
    {
      alert("Error al cargar");
    });
  }

  borrarPelicula(peli:Pelicula)
  {
    this.fireStore.collection("peliculas").doc(peli.nombre).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
}
