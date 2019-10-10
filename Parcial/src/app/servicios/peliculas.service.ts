import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MihttpService } from './mihttp.service';

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
    return this.miHttp.httpPost('borrarPelicula' + id);
  }
}
