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

    let params = new HttpParams();
    //Le mando el id porque no le puse autoincremental
    params = params.set('id', body.id);
    params = params.set('nombre', body.nombre);
    params = params.set('tipo', body.tipo);
    params = params.set('FechaEstreno', body.FechaEstreno);
    params = params.set('CantidadPublico', body.CantidadPublico);
    params = params.set('FotoPelicula', body.FotoPelicula);

    return this.miHttp.httpPost('altaPelicula', params);
  }

}
