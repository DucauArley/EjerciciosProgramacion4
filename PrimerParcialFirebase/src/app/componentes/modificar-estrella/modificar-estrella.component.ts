import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { isUndefined } from 'util';

@Component({
  selector: 'app-modificar-estrella',
  templateUrl: './modificar-estrella.component.html',
  styleUrls: ['./modificar-estrella.component.css']
})
export class ModificarEstrellaComponent implements OnInit {

  @Input() btnEstrella: any;
  @Output() recargarGrilla: EventEmitter<string> = new EventEmitter<string>();
  public nombre:string;
  public apellido:string;
  public nacionalidad:string;
  public nacimiento:string;
  public modific:boolean = false;
  public imagePath;
  public imgURL: any;
  public message: string;

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit(){
  }
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  datos()
  {
    this.modific = true;

    this.nombre = this.btnEstrella.nombre;
    this.apellido= this.btnEstrella.apellido;
    this.nacionalidad = this.btnEstrella.nacionalidad;
    this.nacimiento = this.btnEstrella.nacimiento;
  }

  modificar()
  {
    let ok:boolean = this.verificar();

    if(ok)
    {
      this.fireStore.collection('estrellas').doc(this.apellido).set({
        nombre: this.nombre,
        apellido: this.apellido,
        nacionalidad: this.nacionalidad,
        fechaNacimiento: this.nacimiento,
        fotoEstrella: this.imgURL
      }).catch(function(error)
      {
        alert("Error al cargar");
      });

      this.modific = false;
      this.recargarGrilla.emit();
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


    /*this.btnEstrellas.forEach(estrella =>
    {
      if(estrella.nombre == this.nombre && estrella.apellido == this.apellido)
      {
        okEst = false;
      }
    });*/

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
