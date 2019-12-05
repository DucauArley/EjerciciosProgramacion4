import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Pelicula } from './../../clases/pelicula';
import { MiservicioPrincipalService } from './../../servicios/miservicio-principal.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  public peliculas: Array<any>;
  public nombre: string;
  public esta: boolean;
  public pelicula: Pelicula;

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit()
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
  }

  buscar()
  {
    this.peliculas.forEach(peli=>
      {
        if(peli.nombre == this.nombre)
        {
          this.pelicula = peli;
          this.esta = true;
        }
      })

      if(this.esta != true)
      {
        alert("La pelicula no se encuentra en nuestra base de datos")
      }
  }


}
