import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle-componente',
  templateUrl: './detalle-componente.component.html',
  styleUrls: ['./detalle-componente.component.css']
})
export class DetalleComponenteComponent implements OnInit {

  public estrellas: Array<any>;

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

  recargar()
  {
    location.reload();
  }

}
