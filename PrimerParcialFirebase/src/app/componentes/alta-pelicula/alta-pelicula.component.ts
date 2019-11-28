import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { isUndefined } from 'util';

@Component({
  selector: 'app-alta-pelicula',
  templateUrl: './alta-pelicula.component.html',
  styleUrls: ['./alta-pelicula.component.css']
})
export class AltaPeliculaComponent implements OnInit {

  @Output() cerrarAltaPeli: EventEmitter<any> = new EventEmitter<any>();
  @Input() peliculas: any;
  @Input() estrellas: any;
  public ultimoId: number = 0;
  public nombre: string;
  public tipo: string = "Accion";
  public fecha: string;
  public cantidad: number;
  public estrella: string;

  constructor(private fireStore: AngularFirestore) { }

  ngOnInit() {
  }

  crear()
  {
    let ok = this.verificar();

    if(ok)
    {
      this.fireStore.collection("peliculas").doc(this.nombre).set({
        id: this.ultimoId,
        nombre: this.nombre,
        tipo: this.tipo,
        fechaEstreno: this.fecha,
        cantidadPublico: this.cantidad,
        fotoPelicula: "url",
        actorPrincipal: this.estrella
      }).catch(function(error)
      {
        alert("Error al cargar");
      })

      console.log(this.ultimoId);
      console.log(this.nombre);
      console.log(this.tipo);
      console.log(this.fecha);
      console.log(this.cantidad);


      this.cerrarAltaPeli.emit(false);
    }
  }

  verificar()
  {
    let retorno:boolean = true;
    let okPel:boolean = true;
    document.getElementById("nomb").classList.remove("error");
    document.getElementById("tip").classList.remove("error");
    document.getElementById("public").classList.remove("error");
    document.getElementById("fech").classList.remove("error");
    document.getElementById("est").classList.remove("error");

    document.getElementById("nomb").classList.add("ok");
    document.getElementById("tip").classList.add("ok");
    document.getElementById("public").classList.add("ok");
    document.getElementById("fech").classList.add("ok");
    document.getElementById("est").classList.add("ok");

    this.peliculas.forEach(peli =>
    {
      if(peli.nombre == this.nombre)
      {
        okPel = false;
      }

      if(peli.id > this.ultimoId)
      {
        this.ultimoId = peli.id + 1
      }
    });

    if(okPel != true || isUndefined(this.nombre))
    {
      document.getElementById("nomb").classList.add("error");
      retorno = false;
    }

    if(this.cantidad < 1 || this.cantidad > 500000000 || isUndefined(this.cantidad))
    {
      document.getElementById("public").classList.add("error");
      retorno = false;
    }


    if(isUndefined(this.fecha) || this.fecha == "")
    {
      document.getElementById("fech").classList.add("error");
      retorno = false;
    }

    if(isUndefined(this.estrella))
    {
      document.getElementById("est").classList.add("error");
      retorno = false;
    }

    return retorno;
  }



}
