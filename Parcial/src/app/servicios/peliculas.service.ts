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
    return this.miHttp.httpGetO('peliculas');
  }
}
