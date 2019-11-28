import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-grilla-peliculas',
  templateUrl: './grilla-peliculas.component.html',
  styleUrls: ['./grilla-peliculas.component.css']
})
export class GrillaPeliculasComponent implements OnInit {

  public peliculas: Array<any>;
  public estrellas: Array<any>;
  public altaPeli:boolean = false;


  constructor(private fireStore: AngularFirestore) 
  {
  }

  ngOnInit() 
  {
    this.peliculas = new Array<any>();
    this.estrellas = new Array<any>();

    let pelis = this.fireStore.collection("peliculas").valueChanges();

    pelis.forEach(peli=>
      {
        peli.forEach(item=>
          {
            this.peliculas.push(item);
          })
      });

    let estre = this.fireStore.collection("estrellas").valueChanges();

    estre.forEach(est=>
      {
        est.forEach(item=>
          {
            this.estrellas.push(item);
          })
      });
  }

  cargarPelis($event)
  {
    console.log($event);
    this.peliculas = new Array<any>();
  }

}
