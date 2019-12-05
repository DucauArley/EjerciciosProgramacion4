import { Pelicula } from './../clases/pelicula';
import { PeliculaService } from './pelicula.service';
import { EstrellaService } from './estrella.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Estrella } from '../clases/estrella';

@Injectable({
  providedIn: 'root'
})
export class MiservicioPrincipalService {

  constructor(private peliculas:PeliculaService, private estrellas: EstrellaService) { }

  funcionPelicula(metodo: string, pelicula?:Pelicula)
  {
    let retorno = pelicula;
    switch(metodo)
    {
      case 'traerTodos':
        return this.peliculas.traerTodos();
        break;
      case 'altaPelicula':
        this.peliculas.altaPelicula(pelicula);
        return retorno;
        break;
      case 'borrarPelicula':
        this.peliculas.borrarPelicula(pelicula);
        return retorno;
        break;
    }
  }

  funcionEstrella(metodo: string, estrella?:Estrella)
  {
    let retorno = estrella;
    switch(metodo)
    {
      case 'traerTodos':
        return this.estrellas.traerTodos();
        break;
      case 'altaPelicula':
        this.estrellas.altaEstrella(estrella);
        return retorno;
        break;
    }
  }

}
