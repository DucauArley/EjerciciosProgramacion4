import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './../../servicios/auth.service';
import { auth } from 'firebase/app';
import { MiservicioPrincipalService } from './../../servicios/miservicio-principal.service';

@Component({
  selector: 'app-grilla-peliculas',
  templateUrl: './grilla-peliculas.component.html',
  styleUrls: ['./grilla-peliculas.component.css']
})
export class GrillaPeliculasComponent implements OnInit {

  public peliculas: Array<any>;
  public estrellas: Array<any>;
  public altaPeli:boolean = false;
  public logeado:boolean = false;

  constructor(private fireStore: AngularFirestore, private authService: AuthService)
  {
  }

  ngOnInit()
  {
    this.peliculas = new Array<any>();
    this.estrellas = new Array<any>();
    this.getCurrentUser();

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

  getCurrentUser()
  {
    this.authService.isAuth().subscribe(auth => {
      if(auth)
      {
        this.logeado = true;
        console.log('user logged', this.authService);
      }
      else
      {
        this.logeado = false;
        console.log('NOT user logged', this.authService);
      }
    });
  }


  cargarPelis($event)
  {
    console.log($event);
    this.peliculas = new Array<any>();
  }

}
