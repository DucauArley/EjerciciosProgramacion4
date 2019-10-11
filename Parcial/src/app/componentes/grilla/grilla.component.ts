
import { Component, OnInit } from '@angular/core';
import { PeliculasService } from './../../servicios/peliculas.service';
import { element } from 'protractor';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css'],
  providers:  [ PeliculasService ]
})
export class GrillaComponent implements OnInit {

  constructor(private peliculasService: PeliculasService)
  {

  }

  public peliculas = [];

  ngOnInit()
  {
    this.peliculasService.BuscarTodos().subscribe(element => this.peliculas = element);
  }

  refrescarGrilla(pelis)
  {
    this.peliculas = pelis;
  }

  AltaPelicula()
  {
    this.peliculasService.Alta(null).subscribe(element => console.log(element));
  }

}
