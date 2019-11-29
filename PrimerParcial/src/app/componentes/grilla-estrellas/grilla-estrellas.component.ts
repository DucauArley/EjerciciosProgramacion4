import { MiservicioPrincipalService } from './../../servicios/miservicio-principal.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './../../servicios/auth.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-grilla-estrellas',
  templateUrl: './grilla-estrellas.component.html',
  styleUrls: ['./grilla-estrellas.component.css']
})
export class GrillaEstrellasComponent implements OnInit {

  public estrellas: Array<any>;
  public altaEstr:boolean = false;
  public logeado:boolean = false;

  constructor(private fireStore: AngularFirestore, private authService: AuthService) { }

  ngOnInit()
  {
    this.estrellas = new Array<any>();
    let estre = this.fireStore.collection("estrellas").valueChanges();
    this.getCurrentUser();

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

  cargarEstre()
  {
    this.estrellas = new Array<any>();
  }

}
