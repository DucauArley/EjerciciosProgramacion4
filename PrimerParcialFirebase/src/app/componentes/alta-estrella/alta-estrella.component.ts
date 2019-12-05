import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { isUndefined } from 'util';
import { MiservicioPrincipalService } from './../../servicios/miservicio-principal.service';

@Component({
  selector: 'app-alta-estrella',
  templateUrl: './alta-estrella.component.html',
  styleUrls: ['./alta-estrella.component.css']
})
export class AltaEstrellaComponent implements OnInit {

  @Output() cerrarAltaEstr: EventEmitter<any> = new EventEmitter<any>();
  @Input() estrellas: any;
  public nombre: string;
  public apellido: string;
  public nacionalidad: string;
  public nacimiento: string;

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
  }

  crear()
  {
    let ok = this.verificar();

    if(ok)
    {
      this.fireStore.collection("estrellas").doc(this.apellido).set({
        nombre: this.nombre,
        apellido: this.apellido,
        nacionalidad: this.nacionalidad,
        fechaNacimiento: this.nacimiento,
        activa: "true"
      }).catch(function(error)
      {
        alert("Error al cargar");
      });

      console.log(this.nombre);
      console.log(this.apellido);
      console.log(this.nacionalidad);
      console.log(this.nacimiento);


      this.cerrarAltaEstr.emit(false);
      window.location.reload();
    }
  }

  verificar()
  {
    let retorno:boolean = true;
    let okEst:boolean = true;
    document.getElementById("nomb").classList.remove("error");
    document.getElementById("ape").classList.remove("error");
    document.getElementById("nac").classList.remove("error");
    document.getElementById("fech").classList.remove("error");

    document.getElementById("nomb").classList.add("ok");
    document.getElementById("ape").classList.add("ok");
    document.getElementById("nac").classList.add("ok");
    document.getElementById("fech").classList.add("ok");


    this.estrellas.forEach(estrella =>
    {
      if(estrella.nombre == this.nombre && estrella.apellido == this.apellido)
      {
        okEst = false;
      }
    });

    if(okEst != true || isUndefined(this.nombre))
    {
      document.getElementById("nomb").classList.add("error");
      retorno = false;
    }

    if(okEst != true || isUndefined(this.apellido))
    {
      document.getElementById("ape").classList.add("error");
      retorno = false;
    }

    if(isUndefined(this.nacionalidad))
    {
      document.getElementById("nac").classList.add("error");
      retorno = false;
    }

    if(isUndefined(this.nacimiento))
    {
      document.getElementById("fech").classList.add("error");
      retorno = false;
    }

    return retorno;
  }



}
