import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MiservicioPrincipalService } from './../../servicios/miservicio-principal.service';

@Component({
  selector: 'app-estrellas-peliculas',
  templateUrl: './estrellas-peliculas.component.html',
  styleUrls: ['./estrellas-peliculas.component.css']
})
export class EstrellasPeliculasComponent implements OnInit {

  public peliculas: Array<any>;
  public estrellas: Array<any>;
  public info: Array<any> = new Array<any>();;
  public actor: string = "Octopus";

  constructor(private fireStore: AngularFirestore)
  {
  }

  ngOnInit(){
    this.peliculas = new Array<any>();
    this.estrellas = new Array<any>();

    let pelis = this.fireStore.collection("peliculas").valueChanges();

    pelis.forEach(peli=>
      {
        peli.forEach(item=>
          {
            this.peliculas.push(item);
          })
          this.cambioSelect();
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

  cambioSelect()
  {
    this.info = new Array<any>();

    this.peliculas.forEach(peli=>
      {
        if(peli.actorPrincipal == this.actor)
        {
          this.info.push(peli);
        }
      })
  }

}
