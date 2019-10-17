import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MihttpService } from './mihttp.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { parseTemplate } from '@angular/compiler';
import { Pelicula } from '../clases/pelicula';

@Injectable({
  providedIn: 'root'
})

export class PeliculasService {

  constructor(private miHttp: MihttpService)
  {

  }

  BuscarTodos()
  {
    return this.miHttp.httpGet('peliculas');
  }

  Borrar(id: number)
  {
    return this.miHttp.httpPost('borrarPelicula/' + id, null);
  }

  Alta(body: any)
  {
    const obj = {id: 2, nombre: 'Chucky',
    tipo: 'Terror', FechaEstreno: '20/1/1985', CantidadPublico: 50000, FotoPelicula: 'url'};

    let params = new HttpParams();
    params = params.set('id', '2');
    params = params.set('nombre', 'chucky');
    params = params.set('tipo', 'terror');
    params = params.set('FechaEstreno', '20/10/1986');
    params = params.set('CantidadPublico', '50000');
    params = params.set('FotoPelicula', 'chucky');

    const pelicula = new Pelicula();

    pelicula.id = 2;
    pelicula.nombre = 'Chucky';
    pelicula.tipo = 'terror';
    pelicula.FechaEstreno = '20/10/1986';
    pelicula.CantidadPublico = 50000;
    pelicula.FotoPelicula = 'url';

    /*let asd = JSON.stringify(pelicula);
    let asd2 = JSON.parse(asd);*/

    return this.miHttp.httpPost('altaPelicula', params);
  }

}
