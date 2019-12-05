import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MiservicioPrincipalService } from './../../servicios/miservicio-principal.service';

@Component({
  selector: 'app-boton-borrar',
  templateUrl: './boton-borrar.component.html',
  styleUrls: ['./boton-borrar.component.css']
})
export class BotonBorrarComponent implements OnInit {

  @Input() btnPeli: any;
  @Output() recargarGrilla: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fireStore: AngularFirestore)
  {

  }

  ngOnInit() {
  }

  Borrar()
  {
    this.fireStore.collection("peliculas").doc(this.btnPeli.nombre).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

    this.recargarGrilla.emit(this.btnPeli);
  }

}
