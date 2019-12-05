import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-borrado-logico',
  templateUrl: './borrado-logico.component.html',
  styleUrls: ['./borrado-logico.component.css']
})
export class BorradoLogicoComponent implements OnInit {

  @Input() btnEst: any;
  @Output() recargarGrilla: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
  }

  Borrar()
  {
    this.fireStore.collection('estrellas').doc(this.btnEst.apellido).set({
        nombre: this.btnEst.nombre,
        apellido: this.btnEst.apellido,
        nacionalidad: this.btnEst.nacionalidad,
        fechaNacimiento: this.btnEst.fechaNacimiento,
        fotoEstrella: this.btnEst.fotoEstrella,
        activa: "false"
      }).catch(function(error)
      {
        alert("Error al cargar");
      });

    this.recargarGrilla.emit(this.btnEst);
  }


}
