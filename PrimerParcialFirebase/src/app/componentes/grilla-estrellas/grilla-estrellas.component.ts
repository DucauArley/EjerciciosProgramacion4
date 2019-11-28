import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-grilla-estrellas',
  templateUrl: './grilla-estrellas.component.html',
  styleUrls: ['./grilla-estrellas.component.css']
})
export class GrillaEstrellasComponent implements OnInit {

  public estrellas: Array<any>;
  public altaEstr:boolean = false;

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() 
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
  }

}
