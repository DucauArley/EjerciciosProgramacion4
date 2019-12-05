import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-nexo-estrella-componente',
  templateUrl: './nexo-estrella-componente.component.html',
  styleUrls: ['./nexo-estrella-componente.component.css']
})
export class NexoEstrellaComponenteComponent implements OnInit {

  public estrellas: Array<any>;
  public altaEstr:boolean = false;
  public info: Array<any>;

  constructor(private fireStore: AngularFirestore)
  {
  }

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

  cambioSelect($event)
  {
    this.info = new Array<any>();

    console.log($event);

    this.estrellas.forEach(est=>
      {
        if(est.nacionalidad == $event)
        {
          this.info.push(est);
        }
      })
  }



}
