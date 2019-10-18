
import { Component, OnInit } from '@angular/core';
import { PeliculasService } from './../../servicios/peliculas.service';
import { element } from 'protractor';
import { Pelicula } from 'src/app/clases/pelicula';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css'],
  providers:  [ PeliculasService ]
})
export class GrillaComponent implements OnInit {

  public pelicula: Pelicula;
  public alta: boolean = false;

  constructor(private peliculasService: PeliculasService, private router: Router)
  {
    this.pelicula = new Pelicula();
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
    this.alta = false;
    this.router.navigate(['grilla']);
    this.peliculasService.Alta(this.pelicula).subscribe(element => console.log(element));
  }

}
